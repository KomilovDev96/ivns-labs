import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

class ProjectTranslation {
  @Prop() title: string;
  @Prop() desc: string;
  @Prop() challenge: string;
  @Prop() solution: string;
  @Prop() result: string;
}

class SeoLocale {
  @Prop() metaTitle: string;
  @Prop() metaDescription: string;
  @Prop() keywords: string;
}

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ required: true, enum: ['ecommerce', 'fintech', 'crm', 'analytics', 'automation', 'erp'] })
  category: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  color2: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  duration: string;

  @Prop({ type: [String], default: [] })
  stack: string[];

  @Prop({ required: true })
  statValue: string;

  @Prop({ required: true })
  statLabel: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop()
  image: string;

  @Prop({ type: Object, default: {} })
  translations: {
    ru?: ProjectTranslation;
    uz?: ProjectTranslation;
    en?: ProjectTranslation;
  };

  @Prop({ type: Object, default: {} })
  seo: {
    ogImage?: string;
    ru?: SeoLocale;
    uz?: SeoLocale;
    en?: SeoLocale;
  };
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
