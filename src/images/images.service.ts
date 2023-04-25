import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) { }

  async create(createImageDto: CreateImageDto) {
    const bodyInfo = JSON.stringify(
      {
        "key": "0jWEd6C9zpcCVOZBLRSzUtAjFnqBxFksXgWKLFIQrEephuy2Cq7EM8nu9oQS",
        "prompt": createImageDto.prompt,
        "negative_prompt": "",
        "width": "512",
        "height": "512",
        "samples": 1,
        "num_inference_steps": "25",
        "safety_checker": "no",
        "enhance_prompt": "yes",
        "seed": null,
        "guidance_scale": 7.5,
        "webhook": null,
        "track_id": null
      });

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await axios.post('https://stablediffusionapi.com/api/v3/text2img', bodyInfo, options)

    return this.prisma.image.create({
      data: {
        prompt: createImageDto.prompt,
        urlImage: result.data.output[0],
        userId: createImageDto.userId,
      }
    });
  }

  findAll() {
    return this.prisma.image.findMany();
  }

  findByUserId(userId: number) {
    return this.prisma.image.findMany({ where: { userId: userId , isSolved: true} });
  }

  findOne(id: number) {
    return this.prisma.image.findUnique({ where: { id: id } });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return this.prisma.image.update({
      where: { id: id }, data: {
        isSolved: true
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
