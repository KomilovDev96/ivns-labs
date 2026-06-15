import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  findAll() {
    return this.blogModel.find().sort({ date: -1 });
  }

  findPublished() {
    return this.blogModel.find({ published: true }).sort({ date: -1 });
  }

  async findOne(id: string) {
    const post = await this.blogModel.findById(id);
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  create(dto: CreateBlogDto) {
    return this.blogModel.create(dto);
  }

  async update(id: string, dto: UpdateBlogDto) {
    const post = await this.blogModel.findByIdAndUpdate(id, dto, { new: true });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  async remove(id: string) {
    const post = await this.blogModel.findByIdAndDelete(id);
    if (!post) throw new NotFoundException('Blog post not found');
    return { deleted: true };
  }
}
