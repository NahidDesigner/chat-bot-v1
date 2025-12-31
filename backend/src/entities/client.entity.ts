import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Bot } from './bot.entity';
import { ClientApiKey } from './client-api-key.entity';

@Entity('clients')
export class Client extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'json', nullable: true })
  domain_whitelist: string[];

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string; // active, suspended

  @Column({ type: 'varchar', length: 50, default: 'free' })
  plan: string;

  @Column({ type: 'json', nullable: true })
  limits: Record<string, any>;

  @OneToMany(() => User, (user) => user.client)
  users: User[];

  @OneToMany(() => Bot, (bot) => bot.client)
  bots: Bot[];

  @OneToMany(() => ClientApiKey, (key) => key.client)
  api_keys: ClientApiKey[];
}

