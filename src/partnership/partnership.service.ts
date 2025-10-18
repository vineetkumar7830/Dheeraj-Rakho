import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partnership } from './entities/partnership.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PartnershipService {
  constructor(
    @InjectModel(Partnership.name) private partnershipModel: Model<Partnership>,
    private readonly mailerService: MailerService, // 🟢 dependency fixed
  ) {}

  async create(data: any) {
    if (!data.email || !data.fullName) {
      throw new BadRequestException('Full Name and Email are required.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new BadRequestException('Invalid email format.');
    }

    let created: any;
    try {
      created = new this.partnershipModel(data);
      await created.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to save partnership data.');
    }

    try {
      await this.mailerService.sendMail({
        to: 'hiverift-support@hiverift.com', // company email
        subject: `New Partnership Request from ${data.fullName}`,
        html: `<h2>New Partnership Request</h2>
               <p><b>Full Name:</b> ${data.fullName}</p>
               <p><b>Email:</b> ${data.email}</p>
               <p><b>Phone:</b> ${data.phone || 'N/A'}</p>
               <p><b>City/Location:</b> ${data.city || 'N/A'}</p>
               <p><b>Partnership Type:</b> ${data.partnershipType || 'N/A'}</p>
               <p><b>Business Advisory Experience:</b> ${data.businessAdvisoryExperience || 'N/A'}</p>
               <p><b>Size of Existing Client Base:</b> ${data.sizeOfExistingClientBase || 'N/A'}</p>
               <p><b>Current Business Services & Network:</b> ${data.currentBusinessServiceAndProfessionalNetwork || 'N/A'}</p>
               <hr/>
               <p style="font-size: 12px; color: gray;">This email was automatically sent by Hiverift Partnership Form.</p>`
      });
    } catch (mailError) {
      console.error('Mail failed:', mailError);
      throw new InternalServerErrorException('Failed to send email. Check SMTP configuration.');
    }

    return {
      success: true,
      message: 'Partnership request submitted successfully!',
      result: created,
    };
  }

  async findAll() {
    const items = await this.partnershipModel.find().sort({ createdAt: -1 });
    return { success: true, message: 'Data fetched', result: items };
  }

  async findOne(id: string) {
    const item = await this.partnershipModel.findById(id);
    if (!item) throw new NotFoundException('Partnership not found');
    return { success: true, message: 'Data fetched', result: item };
  }

  async update(id: string, data: any) {
    const updated = await this.partnershipModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new NotFoundException('Partnership not found');
    return { success: true, message: 'Partnership updated', result: updated };
  }

  async remove(id: string) {
    const deleted = await this.partnershipModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Partnership not found');
    return { success: true, message: 'Partnership removed', result: deleted };
  }
}
