import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;

export type ContentSection =
  | 'hero' | 'about' | 'process' | 'contact'
  | 'testimonials' | 'clients' | 'footer' | 'nav';

@Schema({ timestamps: true })
export class Content {
  @Prop({ required: true, unique: true })
  section: string;

  @Prop({ type: Object, default: {} })
  ru: Record<string, string>;

  @Prop({ type: Object, default: {} })
  uz: Record<string, string>;

  @Prop({ type: Object, default: {} })
  en: Record<string, string>;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
