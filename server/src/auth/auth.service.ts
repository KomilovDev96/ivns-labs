import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const admin = await this.adminModel.findOne({ email: dto.email });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, admin.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    return { access_token: token, email: admin.email, role: admin.role };
  }

  async seed() {
    const exists = await this.adminModel.findOne({ email: 'admin@ivns.uz' });
    if (exists) return { message: 'Admin already exists' };

    const hash = await bcrypt.hash('admin123', 10);
    await this.adminModel.create({ email: 'admin@ivns.uz', password: hash });
    return { message: 'Admin created: admin@ivns.uz / admin123' };
  }
}
