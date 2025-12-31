import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Bot } from './bot.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation extends BaseEntity {
  @Column({ type: 'int' })
  bot_id: number;

  @Column({ type: 'varchar', length: 255 })
  session_id: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  language_detected: string; // ISO-639-1

  @Column({ type: 'varchar', length: 45, nullable: true })
  user_ip: string;

  @Column({ type: 'timestamp', nullable: true })
  started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_message_at: Date;

  @ManyToOne(() => Bot, (bot) => bot.conversations)
  @JoinColumn({ name: 'bot_id' })
  bot: Bot;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}

