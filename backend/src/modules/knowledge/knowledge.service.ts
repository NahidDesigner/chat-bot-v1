import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowledgeSource } from '../../entities/knowledge-source.entity';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(KnowledgeSource)
    private knowledgeRepository: Repository<KnowledgeSource>,
  ) {}
}

