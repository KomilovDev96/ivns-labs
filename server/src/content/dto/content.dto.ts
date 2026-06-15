import { IsString, IsObject, IsOptional } from 'class-validator';

export class UpsertContentDto {
  @IsString()
  section: string;

  @IsOptional()
  @IsObject()
  ru?: Record<string, string>;

  @IsOptional()
  @IsObject()
  uz?: Record<string, string>;

  @IsOptional()
  @IsObject()
  en?: Record<string, string>;
}
