import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Client } from '../entities/client.entity';
import { ClientApiKey } from '../entities/client-api-key.entity';
import { Bot } from '../entities/bot.entity';
import { BotSetting } from '../entities/bot-setting.entity';
import { KnowledgeSource } from '../entities/knowledge-source.entity';
import { Embedding } from '../entities/embedding.entity';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { SystemSetting } from '../entities/system-setting.entity';
import { UsageLog } from '../entities/usage-log.entity';
import { SetupWizard } from '../entities/setup-wizard.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Support both Supabase connection string and individual parameters
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseDbUrl = configService.get<string>('SUPABASE_DB_URL');
        
        if (supabaseDbUrl) {
          // Use Supabase connection string directly
          return {
            type: 'postgres',
            url: supabaseDbUrl,
            entities: [
              User,
              Role,
              Client,
              ClientApiKey,
              Bot,
              BotSetting,
              KnowledgeSource,
              Embedding,
              Conversation,
              Message,
              SystemSetting,
              UsageLog,
              SetupWizard,
            ],
            synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
            logging: configService.get<boolean>('DB_LOGGING', false),
            ssl: { rejectUnauthorized: false }, // Supabase requires SSL
          };
        }
        
        // Fallback to individual parameters
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_DATABASE', 'chatbot_db'),
          entities: [
            User,
            Role,
            Client,
            ClientApiKey,
            Bot,
            BotSetting,
            KnowledgeSource,
            Embedding,
            Conversation,
            Message,
            SystemSetting,
            UsageLog,
            SetupWizard,
          ],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
          logging: configService.get<boolean>('DB_LOGGING', false),
          ssl: supabaseUrl ? { rejectUnauthorized: false } : false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

