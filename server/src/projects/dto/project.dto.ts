import { IsString, IsEnum, IsNumber, IsArray, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProjectTranslationDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() desc?: string;
  @IsOptional() @IsString() challenge?: string;
  @IsOptional() @IsString() solution?: string;
  @IsOptional() @IsString() result?: string;
}

class ProjectTranslationsDto {
  @IsOptional() @ValidateNested() @Type(() => ProjectTranslationDto) ru?: ProjectTranslationDto;
  @IsOptional() @ValidateNested() @Type(() => ProjectTranslationDto) uz?: ProjectTranslationDto;
  @IsOptional() @ValidateNested() @Type(() => ProjectTranslationDto) en?: ProjectTranslationDto;
}

class SeoLocaleDto {
  @IsOptional() @IsString() metaTitle?: string;
  @IsOptional() @IsString() metaDescription?: string;
  @IsOptional() @IsString() keywords?: string;
}
class SeoDto {
  @IsOptional() @IsString() ogImage?: string;
  @IsOptional() @ValidateNested() @Type(() => SeoLocaleDto) ru?: SeoLocaleDto;
  @IsOptional() @ValidateNested() @Type(() => SeoLocaleDto) uz?: SeoLocaleDto;
  @IsOptional() @ValidateNested() @Type(() => SeoLocaleDto) en?: SeoLocaleDto;
}

export class CreateProjectDto {
  @IsString() slug: string;
  @IsString() tag: string;
  @IsEnum(['ecommerce', 'fintech', 'crm', 'analytics', 'automation', 'erp']) category: string;
  @IsString() color: string;
  @IsString() color2: string;
  @IsNumber() year: number;
  @IsString() duration: string;
  @IsArray() @IsString({ each: true }) stack: string[];
  @IsString() statValue: string;
  @IsString() statLabel: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @ValidateNested() @Type(() => ProjectTranslationsDto) translations?: ProjectTranslationsDto;
  @IsOptional() @ValidateNested() @Type(() => SeoDto) seo?: SeoDto;
}

export class UpdateProjectDto extends CreateProjectDto {}
