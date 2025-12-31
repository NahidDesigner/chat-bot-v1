import { Entity, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Client } from './client.entity';
import { BotSetting } from './bot-setting.entity';
import { KnowledgeSource } from './knowledge-source.entity';
import { Conversation } from './conversation.entity';

@Entity('bots')
export class Bot extends BaseEntity {
  @Column({ type: 'int' })
  client_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50, default: 'friendly' })
  tone: string; // friendly, formal, sales

  @Column({ type: 'text', nullable: true })
  greeting_message: string;

  @Column({ type: 'text', nullable: true })
  system_prompt_override: string;

  @Column({ type: 'text', nullable: true })
  domain_whitelist: string; // Comma-separated

  @ManyToOne(() => Client, (client) => client.bots)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToOne(() => BotSetting, (setting) => setting.bot)
  settings: BotSetting;

  @OneToMany(() => KnowledgeSource, (source) => source.bot)
  knowledge_sources: KnowledgeSource[];

  @OneToMany(() => Conversation, (conversation) => conversation.bot)
  conversations: Conversation[];
}

