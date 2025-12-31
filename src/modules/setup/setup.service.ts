import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { SystemSetting } from '../../entities/system-setting.entity';
import { SetupWizard } from '../../entities/setup-wizard.entity';
import { SetupStep1Dto, SetupStep2Dto, SetupStep3Dto, SetupStep4Dto, SetupStep5Dto } from './dto/setup.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import OpenAI from 'openai';

@Injectable()
export class SetupService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(SystemSetting)
    private systemSettingRepository: Repository<SystemSetting>,
    @InjectRepository(SetupWizard)
    private setupWizardRepository: Repository<SetupWizard>,
    private configService: ConfigService,
  ) {}

  async checkStatus() {
    const setupCompleted = await this.systemSettingRepository.findOne({
      where: { key: 'setup_completed' },
    });

    return {
      completed: setupCompleted?.value === 'true',
      canReset: this.configService.get<string>('ALLOW_SETUP_RESET') === 'true',
    };
  }

  async step1(dto: SetupStep1Dto) {
    // Check if setup already completed
    const setupCompleted = await this.systemSettingRepository.findOne({
      where: { key: 'setup_completed' },
    });
    if (setupCompleted?.value === 'true') {
      throw new BadRequestException('Setup already completed');
    }

    // Create root admin role if not exists
    let rootRole = await this.roleRepository.findOne({ where: { name: 'root_admin' } });
    if (!rootRole) {
      rootRole = this.roleRepository.create({
        name: 'root_admin',
        permissions: JSON.stringify(['*']),
      });
      await this.roleRepository.save(rootRole);
    }

    // Create root admin user
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const adminUser = this.userRepository.create({
      email: dto.email,
      password_hash: passwordHash,
      role_id: rootRole.id,
      is_active: true,
    });
    await this.userRepository.save(adminUser);

    // Save platform name and timezone
    await this.saveSetting('platform_name', dto.platform_name);
    await this.saveSetting('default_timezone', dto.default_timezone);

    return { success: true, message: 'Root admin created' };
  }

  async step2(dto: SetupStep2Dto) {
    // Test OpenAI API key
    this.openai = new OpenAI({ apiKey: dto.openai_api_key });
    try {
      await this.openai.models.list();
    } catch (error) {
      throw new BadRequestException('Invalid OpenAI API key');
    }

    // Save OpenAI settings
    await this.saveSetting('openai_api_key', dto.openai_api_key);
    await this.saveSetting('openai_default_model', dto.default_model);
    await this.saveSetting('openai_max_tokens', dto.max_tokens.toString());
    await this.saveSetting('monthly_token_cap', dto.monthly_token_cap.toString());

    return { success: true, message: 'OpenAI configuration saved' };
  }

  async step3(dto: SetupStep3Dto) {
    await this.saveSetting('platform_default_language', dto.default_language);
    await this.saveSetting('auto_language_detection', dto.auto_detection.toString());
    await this.saveSetting('rtl_support', dto.rtl_support.toString());

    return { success: true, message: 'Language defaults saved' };
  }

  async step4(dto: SetupStep4Dto) {
    // Database is already initialized via TypeORM
    // Create client_admin role
    let clientRole = await this.roleRepository.findOne({ where: { name: 'client_admin' } });
    if (!clientRole) {
      clientRole = this.roleRepository.create({
        name: 'client_admin',
        permissions: JSON.stringify(['manage_bots', 'view_analytics', 'manage_knowledge']),
      });
      await this.roleRepository.save(clientRole);
    }

    return { success: true, message: 'Database initialized' };
  }

  async step5(dto: SetupStep5Dto) {
    await this.saveSetting('upload_dir', dto.upload_path);
    await this.saveSetting('max_file_size', dto.max_file_size.toString());
    await this.saveSetting('allowed_formats', JSON.stringify(dto.allowed_formats));

    return { success: true, message: 'Storage configuration saved' };
  }

  async step6() {
    // Validate OpenAI connection
    const apiKey = await this.getSetting('openai_api_key');
    if (!apiKey) {
      throw new BadRequestException('OpenAI API key not configured');
    }

    this.openai = new OpenAI({ apiKey });
    try {
      await this.openai.models.list();
    } catch (error) {
      throw new BadRequestException('OpenAI API test failed');
    }

    // Database connectivity is already tested via TypeORM

    return { success: true, message: 'All validations passed' };
  }

  async complete() {
    await this.saveSetting('setup_completed', 'true');
    await this.saveSetting('setup_completed_at', new Date().toISOString());

    return { success: true, message: 'Setup completed successfully' };
  }

  private async saveSetting(key: string, value: string) {
    let setting = await this.systemSettingRepository.findOne({ where: { key } });
    if (setting) {
      setting.value = value;
    } else {
      setting = this.systemSettingRepository.create({ key, value });
    }
    await this.systemSettingRepository.save(setting);
  }

  private async getSetting(key: string): Promise<string | null> {
    const setting = await this.systemSettingRepository.findOne({ where: { key } });
    return setting?.value || null;
  }
}

