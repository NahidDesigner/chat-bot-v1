import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetupController } from './setup.controller';
import { SetupService } from './setup.service';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { SystemSetting } from '../../entities/system-setting.entity';
import { SetupWizard } from '../../entities/setup-wizard.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, SystemSetting, SetupWizard]),
  ],
  controllers: [SetupController],
  providers: [SetupService],
})
export class SetupModule {}

