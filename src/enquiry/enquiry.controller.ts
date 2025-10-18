import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Post()
  create(@Body() dto: CreateEnquiryDto) {
    return this.enquiryService.create(dto);
  }

  @Get()
  findAll() {
    return this.enquiryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enquiryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateEnquiryDto>) {
    return this.enquiryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enquiryService.delete(id);
  }
}
