import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PartnershipService } from './partnership.service';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';

@Controller('partnership')
export class PartnershipController {
  constructor(private readonly partnershipService: PartnershipService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreatePartnershipDto) {
    return await this.partnershipService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.partnershipService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.partnershipService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() dto: UpdatePartnershipDto) {
    return await this.partnershipService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.partnershipService.remove(id);
  }
}
