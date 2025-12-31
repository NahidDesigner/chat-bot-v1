import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('usage_logs')
export class UsageLog extends BaseEntity {
  @Column({ type: 'int', nullable: true })
  client_id: number;

  @Column({ type: 'int', nullable: true })
  bot_id: number;

  @Column({ type: 'bigint', default: 0 })
  tokens_used: number;

  @Column({ type: 'varchar', length: 50 })
  request_type: string; // chat, embedding, etc.

  @Column({ type: 'timestamp', nullable: true })
  timestamp: Date;
}

