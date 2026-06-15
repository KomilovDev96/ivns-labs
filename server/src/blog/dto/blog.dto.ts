import { IsString, IsEnum, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BlogTranslationDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() content?: string;
}

class BlogTranslationsDto {
  @IsOptional() @ValidateNested() @Type(() => BlogTranslationDto) ru?: BlogTranslationDto;
  @IsOptional() @ValidateNested() @Type(() => BlogTranslationDto) uz?: BlogTranslationDto;
  @IsOptional() @ValidateNested() @Type(() => BlogTranslationDto) en?: BlogTranslationDto;
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

export class CreateBlogDto {
  @IsString() slug: string;
  @IsEnum(['tech', 'business', 'ai', 'design', 'news']) category: string;
  @IsString() color: string;
  @IsString() color2: string;
  @IsString() date: string;
  @IsString() readTime: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @ValidateNested() @Type(() => BlogTranslationsDto) translations?: BlogTranslationsDto;
  @IsOptional() @ValidateNested() @Type(() => SeoDto) seo?: SeoDto;
  @IsOptional() @IsBoolean() published?: boolean;
}

export class UpdateBlogDto extends CreateBlogDto {}
