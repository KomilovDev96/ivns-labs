import { IsString, IsOptional, IsBoolean, IsObject, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class TeamTranslationDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() position?: string;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) skills?: string[];
}

class TeamTranslationsDto {
  @IsOptional() @ValidateNested() @Type(() => TeamTranslationDto) ru?: TeamTranslationDto;
  @IsOptional() @ValidateNested() @Type(() => TeamTranslationDto) uz?: TeamTranslationDto;
  @IsOptional() @ValidateNested() @Type(() => TeamTranslationDto) en?: TeamTranslationDto;
}

export class CreateTeamMemberDto {
  @IsString() memberId: string;
  @IsString() initials: string;
  @IsString() color1: string;
  @IsString() color2: string;
  @IsOptional() @IsString() avatar?: string;
  @IsOptional() @IsObject() socials?: { linkedin?: string; github?: string; telegram?: string };
  @IsOptional() @ValidateNested() @Type(() => TeamTranslationsDto) translations?: TeamTranslationsDto;
  @IsOptional() @IsBoolean() active?: boolean;
}

export class UpdateTeamMemberDto extends CreateTeamMemberDto {}
