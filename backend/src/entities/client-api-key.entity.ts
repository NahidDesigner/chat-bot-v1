import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Client } from './client.entity';

@Entity('client_api_keys')
export class ClientApiKey extends BaseEntity {
  @Column({ type: 'int' })
  client_id: number;

  @Column({ type: 'varchar', length: 500 })
  openai_key_encrypted: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => Client, (client) => client.api_keys)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}

