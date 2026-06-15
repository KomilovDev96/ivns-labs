import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { UpsertContentDto } from './dto/content.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':section')
  findBySection(@Param('section') section: string) {
    return this.contentService.findBySection(section);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  upsert(@Body() dto: UpsertContentDto) {
    return this.contentService.upsert(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('seed/defaults')
  seedDefaults() {
    return this.contentService.seedDefaults();
  }

  @UseGuards(JwtAuthGuard)
  @Post('seed/force')
  seedForce() {
    return this.contentService.seedForce();
  }
}
