import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageLog } from '../../entities/usage-log.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(UsageLog)
    private usageLogRepository: Repository<UsageLog>,
  ) {}
}

