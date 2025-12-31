import { IsEmail, IsString, IsNotEmpty, IsNumber, IsBoolean, IsArray, Min, Max } from 'class-validator';

export class SetupStep1Dto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  platform_name: string;

  @IsString()
  @IsNotEmpty()
  default_timezone: string;
}

export class SetupStep2Dto {
  @IsString()
  @IsNotEmpty()
  openai_api_key: string;

  @IsString()
  @IsNotEmpty()
  default_model: string;

  @IsNumber()
  @Min(100)
  @Max(4000)
  max_tokens: number;

  @IsNumber()
  @Min(0)
  monthly_token_cap: number;
}

export class SetupStep3Dto {
  @IsString()
  @IsNotEmpty()
  default_language: string; // ISO-639-1

  @IsBoolean()
  auto_detection: boolean;

  @IsBoolean()
  rtl_support: boolean;
}

export class SetupStep4Dto {
  // Database initialization - no input needed
}

export class SetupStep5Dto {
  @IsString()
  @IsNotEmpty()
  upload_path: string;

  @IsNumber()
  @Min(1024)
  max_file_size: number;

  @IsArray()
  @IsString({ each: true })
  allowed_formats: string[];
}

