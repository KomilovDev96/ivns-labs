import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

class ServiceTranslation {
  @Prop() title: string;
  @Prop() subtitle: string;
  @Prop({ type: [String], default: [] }) features: string[];
}

class SeoLocale {
  @Prop() metaTitle: string;
  @Prop() metaDescription: string;
  @Prop() keywords: string;
}

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true, unique: true })
  serviceId: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ required: true })
  color1: string;

  @Prop({ required: true })
  color2: string;

  @Prop({ type: Object, default: {} })
  translations: {
    ru?: ServiceTranslation;
    uz?: ServiceTranslation;
    en?: ServiceTranslation;
  };

  @Prop({ type: Object, default: {} })
  seo: {
    ogImage?: string;
    ru?: SeoLocale;
    uz?: SeoLocale;
    en?: SeoLocale;
  };

  @Prop({ default: true })
  active: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
