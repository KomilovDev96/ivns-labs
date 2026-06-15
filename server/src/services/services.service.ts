import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>) {}

  findAll() {
    return this.serviceModel.find({ active: true });
  }

  findAllAdmin() {
    return this.serviceModel.find();
  }

  async findOne(id: string) {
    const service = await this.serviceModel.findById(id);
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  create(dto: CreateServiceDto) {
    return this.serviceModel.create(dto);
  }

  async update(id: string, dto: UpdateServiceDto) {
    const service = await this.serviceModel.findByIdAndUpdate(id, dto, { new: true });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async remove(id: string) {
    const service = await this.serviceModel.findByIdAndDelete(id);
    if (!service) throw new NotFoundException('Service not found');
    return { deleted: true };
  }
}
