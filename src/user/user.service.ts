import { Injectable } from '@nestjs/common';
import {CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async createNewUser(createUserDto: CreateUserDto) {
    return (await this.prisma.user.create({ data: createUserDto })).id;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findUnique({ where: { id: id} });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
