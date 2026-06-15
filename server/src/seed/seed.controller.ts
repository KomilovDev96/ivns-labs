import { Controller, Post, UseGuards } from '@nestjs/common';
import { SeedService } from './seed.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('seed')
export class SeedController {
  constructor(private seedService: SeedService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  seedAll() {
    return this.seedService.seedAll(false);
  }

  @UseGuards(JwtAuthGuard)
  @Post('force')
  seedForce() {
    return this.seedService.seedAll(true);
  }
}
