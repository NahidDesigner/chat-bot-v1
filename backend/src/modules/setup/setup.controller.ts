import { Controller, Post, Get, Body } from '@nestjs/common';
import { SetupService } from './setup.service';
import { SetupStep1Dto, SetupStep2Dto, SetupStep3Dto, SetupStep4Dto, SetupStep5Dto } from './dto/setup.dto';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Get('check-status')
  async checkStatus() {
    return this.setupService.checkStatus();
  }

  @Post('step-1')
  async step1(@Body() dto: SetupStep1Dto) {
    return this.setupService.step1(dto);
  }

  @Post('step-2')
  async step2(@Body() dto: SetupStep2Dto) {
    return this.setupService.step2(dto);
  }

  @Post('step-3')
  async step3(@Body() dto: SetupStep3Dto) {
    return this.setupService.step3(dto);
  }

  @Post('step-4')
  async step4(@Body() dto: SetupStep4Dto) {
    return this.setupService.step4(dto);
  }

  @Post('step-5')
  async step5(@Body() dto: SetupStep5Dto) {
    return this.setupService.step5(dto);
  }

  @Post('step-6')
  async step6() {
    return this.setupService.step6();
  }

  @Post('complete')
  async complete() {
    return this.setupService.complete();
  }
}

