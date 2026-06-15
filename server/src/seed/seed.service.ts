import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../blog/schemas/blog.schema';
import { Project, ProjectDocument } from '../projects/schemas/project.schema';
import { Service, ServiceDocument } from '../services/schemas/service.schema';
import { TeamMember, TeamMemberDocument } from '../team/schemas/team.schema';
import { SEED_ALL } from './seed-all';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    @InjectModel(TeamMember.name) private teamModel: Model<TeamMemberDocument>,
  ) {}

  async seedAll(force = false) {
    const result = { blog: 0, projects: 0, services: 0, team: 0, skipped: 0 };

    for (const post of SEED_ALL.blog as any[]) {
      const exists = await this.blogModel.findOne({ slug: post.slug });
      if (!exists || force) {
        await this.blogModel.findOneAndUpdate({ slug: post.slug }, post, { upsert: true, new: true });
        result.blog++;
      } else result.skipped++;
    }

    for (const proj of SEED_ALL.projects as any[]) {
      const exists = await this.projectModel.findOne({ slug: proj.slug });
      if (!exists || force) {
        await this.projectModel.findOneAndUpdate({ slug: proj.slug }, proj, { upsert: true, new: true });
        result.projects++;
      } else result.skipped++;
    }

    for (const svc of SEED_ALL.services as any[]) {
      const exists = await this.serviceModel.findOne({ serviceId: svc.serviceId });
      if (!exists || force) {
        await this.serviceModel.findOneAndUpdate({ serviceId: svc.serviceId }, svc, { upsert: true, new: true });
        result.services++;
      } else result.skipped++;
    }

    for (const member of SEED_ALL.team as any[]) {
      const exists = await this.teamModel.findOne({ memberId: member.memberId });
      if (!exists || force) {
        await this.teamModel.findOneAndUpdate({ memberId: member.memberId }, member, { upsert: true, new: true });
        result.team++;
      } else result.skipped++;
    }

    return result;
  }
}
