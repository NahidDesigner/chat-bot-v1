import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;
  private supabaseUrl: string;
  private supabaseKey: string;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    this.supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');

    if (this.supabaseUrl && this.supabaseKey) {
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env');
    }
    return this.supabase;
  }

  /**
   * Upload file to Supabase Storage
   */
  async uploadFile(bucket: string, path: string, file: Buffer, contentType: string) {
    const client = this.getClient();
    const { data, error } = await client.storage
      .from(bucket)
      .upload(path, file, {
        contentType,
        upsert: true,
      });

    if (error) throw error;
    return data;
  }

  /**
   * Get public URL for file
   */
  getPublicUrl(bucket: string, path: string): string {
    const client = this.getClient();
    const { data } = client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  /**
   * Delete file from Supabase Storage
   */
  async deleteFile(bucket: string, path: string) {
    const client = this.getClient();
    const { error } = await client.storage.from(bucket).remove([path]);
    if (error) throw error;
  }

  /**
   * Download file from Supabase Storage
   */
  async downloadFile(bucket: string, path: string) {
    const client = this.getClient();
    const { data, error } = await client.storage.from(bucket).download(path);
    if (error) throw error;
    return data;
  }
}

