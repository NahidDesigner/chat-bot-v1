import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Bot } from './bot.entity';

@Entity('bot_settings')
export class BotSetting extends BaseEntity {
  @Column({ type: 'int', unique: true })
  bot_id: number;

  @Column({ type: 'text', nullable: true })
  brand_colors: string; // JSON string

  @Column({ type: 'varchar', length: 500, nullable: true })
  logo_url: string;

  @Column({ type: 'varchar', length: 20, default: 'bottom-right' })
  position: string;

  @Column({ type: 'text', nullable: true })
  language_defaults: string; // JSON string

  @OneToOne(() => Bot, (bot) => bot.settings)
  @JoinColumn({ name: 'bot_id' })
  bot: Bot;
}

