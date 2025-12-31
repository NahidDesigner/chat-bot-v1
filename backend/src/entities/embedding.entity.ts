import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { KnowledgeSource } from './knowledge-source.entity';

@Entity('embeddings')
export class Embedding extends BaseEntity {
  @Column({ type: 'int' })
  knowledge_source_id: number;

  @Column({ type: 'text' })
  chunk_text: string;

  @Column({ type: 'int' })
  chunk_index: number;

  @Column({ type: 'varchar', length: 50 })
  qdrant_id: string; // ID in Qdrant vector DB

  @Column({ type: 'varchar', length: 10, nullable: true })
  language: string; // ISO-639-1

  @Column({ type: 'text', nullable: true })
  metadata: string; // JSON string

  @ManyToOne(() => KnowledgeSource, (source) => source.embeddings)
  @JoinColumn({ name: 'knowledge_source_id' })
  knowledge_source: KnowledgeSource;
}

