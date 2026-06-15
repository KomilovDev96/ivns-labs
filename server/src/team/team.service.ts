import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from './schemas/team.schema';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team.dto';

@Injectable()
export class TeamService {
  constructor(@InjectModel(TeamMember.name) private teamModel: Model<TeamMemberDocument>) {}

  findAll() {
    return this.teamModel.find({ active: true });
  }

  findAllAdmin() {
    return this.teamModel.find();
  }

  async findOne(id: string) {
    const member = await this.teamModel.findById(id);
    if (!member) throw new NotFoundException('Team member not found');
    return member;
  }

  create(dto: CreateTeamMemberDto) {
    return this.teamModel.create(dto);
  }

  async update(id: string, dto: UpdateTeamMemberDto) {
    const member = await this.teamModel.findByIdAndUpdate(id, dto, { new: true });
    if (!member) throw new NotFoundException('Team member not found');
    return member;
  }

  async remove(id: string) {
    const member = await this.teamModel.findByIdAndDelete(id);
    if (!member) throw new NotFoundException('Team member not found');
    return { deleted: true };
  }
}
