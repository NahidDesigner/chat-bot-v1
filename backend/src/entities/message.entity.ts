import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Conversation } from './conversation.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @Column({ type: 'int' })
  conversation_id: number;

  @Column({ type: 'varchar', length: 10 })
  role: string; // user, bot

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  language: string; // ISO-639-1

  @Column({ type: 'bigint', default: 0 })
  tokens_used: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}

