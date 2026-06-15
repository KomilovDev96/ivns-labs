import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { UpsertContentDto } from './dto/content.dto';
import { SEED_DATA } from './seed-data';

@Injectable()
export class ContentService {
  constructor(@InjectModel(Content.name) private contentModel: Model<ContentDocument>) {}

  findAll() {
    return this.contentModel.find();
  }

  findBySection(section: string) {
    return this.contentModel.findOne({ section });
  }

  async upsert(dto: UpsertContentDto) {
    return this.contentModel.findOneAndUpdate(
      { section: dto.section },
      { $set: { ru: dto.ru ?? {}, uz: dto.uz ?? {}, en: dto.en ?? {} } },
      { upsert: true, new: true },
    );
  }

  async seedDefaults() {
    let seeded = 0, skipped = 0;
    for (const [section, data] of Object.entries(SEED_DATA)) {
      const existing = await this.contentModel.findOne({ section });
      if (!existing) {
        await this.contentModel.create({ section, ru: data.ru, uz: data.uz, en: data.en });
        seeded++;
      } else {
        skipped++;
      }
    }
    return { seeded, skipped };
  }

  async seedForce() {
    const sections: string[] = [];
    for (const [section, data] of Object.entries(SEED_DATA)) {
      await this.contentModel.findOneAndUpdate(
        { section },
        { $set: { ru: data.ru, uz: data.uz, en: data.en } },
        { upsert: true, new: true },
      );
      sections.push(section);
    }
    return { updated: sections.length, sections };
  }
}
