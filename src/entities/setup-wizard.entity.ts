import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('setup_wizard')
export class SetupWizard extends BaseEntity {
  @Column({ type: 'int' })
  step: number;

  @Column({ type: 'text' })
  completed: string; // JSON string of completed steps

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;
}

