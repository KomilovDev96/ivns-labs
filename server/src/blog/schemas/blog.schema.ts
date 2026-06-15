import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

class BlogTranslation {
  @Prop() title: string;
  @Prop() excerpt: string;
  @Prop() content: string;
}

class SeoLocale {
  @Prop() metaTitle: string;
  @Prop() metaDescription: string;
  @Prop() keywords: string;
}

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, enum: ['tech', 'business', 'ai', 'design', 'news'] })
  category: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  color2: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  readTime: string;

  @Prop()
  image: string;

  @Prop({ type: Object, default: {} })
  translations: {
    ru?: BlogTranslation;
    uz?: BlogTranslation;
    en?: BlogTranslation;
  };

  @Prop({ type: Object, default: {} })
  seo: {
    ogImage?: string;
    ru?: SeoLocale;
    uz?: SeoLocale;
    en?: SeoLocale;
  };

  @Prop({ default: true })
  published: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
