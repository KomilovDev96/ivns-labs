import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { Blog, BlogSchema } from '../blog/schemas/blog.schema';
import { Project, ProjectSchema } from '../projects/schemas/project.schema';
import { Service, ServiceSchema } from '../services/schemas/service.schema';
import { TeamMember, TeamMemberSchema } from '../team/schemas/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
