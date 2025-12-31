import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'AI Chatbot Platform API v1.0.0';
  }
}

