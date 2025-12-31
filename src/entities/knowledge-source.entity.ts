import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Bot } from './bot.entity';
import { Embedding } from './embedding.entity';

@Entity('knowledge_sources')
export class KnowledgeSource extends BaseEntity {
  @Column({ type: 'int' })
  bot_id: number;

  @Column({ type: 'varchar', length: 20 })
  source_type: string; // pdf, docx, txt, url, manual

  @Column({ type: 'varchar', length: 500, nullable: true })
  file_path: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  url: string;

  @Column({ type: 'text', nullable: true })
  content_text: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  language: string; // ISO-639-1

  @Column({ type: 'timestamp', nullable: true })
  processed_at: Date;

  @ManyToOne(() => Bot, (bot) => bot.knowledge_sources)
  @JoinColumn({ name: 'bot_id' })
  bot: Bot;

  @OneToMany(() => Embedding, (embedding) => embedding.knowledge_source)
  embeddings: Embedding[];
}

