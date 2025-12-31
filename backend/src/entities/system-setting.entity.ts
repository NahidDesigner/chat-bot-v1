import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('system_settings')
export class SystemSetting extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  key: string;

  @Column({ type: 'text', nullable: true })
  value: string; // JSON string
}

