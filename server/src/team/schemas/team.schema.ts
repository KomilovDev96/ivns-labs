import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamMemberDocument = TeamMember & Document;

class TeamTranslation {
  @Prop() name: string;
  @Prop() position: string;
  @Prop() bio: string;
  @Prop({ type: [String], default: [] }) skills: string[];
}

@Schema({ timestamps: true })
export class TeamMember {
  @Prop({ required: true, unique: true })
  memberId: string;

  @Prop({ required: true })
  initials: string;

  @Prop({ required: true })
  color1: string;

  @Prop({ required: true })
  color2: string;

  @Prop()
  avatar: string;

  @Prop({ type: Object, default: {} })
  socials: {
    linkedin?: string;
    github?: string;
    telegram?: string;
  };

  @Prop({ type: Object, default: {} })
  translations: {
    ru?: TeamTranslation;
    uz?: TeamTranslation;
    en?: TeamTranslation;
  };

  @Prop({ default: true })
  active: boolean;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
