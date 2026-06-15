import { IsString, IsOptional, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class ServiceTranslationDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() subtitle?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) features?: string[];
}

class ServiceTranslationsDto {
  @IsOptional() @ValidateNested() @Type(() => ServiceTranslationDto) ru?: ServiceTranslationDto;
  @IsOptional() @ValidateNested() @Type(() => ServiceTranslationDto) uz?: ServiceTranslationDto;
  @IsOptional() @ValidateNested() @Type(() => ServiceTranslationDto) en?: ServiceTranslationDto;
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

export class CreateServiceDto {
  @IsString() serviceId: string;
  @IsString() tag: string;
  @IsString() color1: string;
  @IsString() color2: string;
  @IsOptional() @ValidateNested() @Type(() => ServiceTranslationsDto) translations?: ServiceTranslationsDto;
  @IsOptional() @ValidateNested() @Type(() => SeoDto) seo?: SeoDto;
  @IsOptional() @IsBoolean() active?: boolean;
}

export class UpdateServiceDto extends CreateServiceDto {}
