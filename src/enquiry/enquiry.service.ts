import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { Enquiry } from './entities/enquiry.entity';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectModel(Enquiry.name)
    private readonly enquiryModel: Model<Enquiry>,
  ) {}

  async create(enquiryData: CreateEnquiryDto) {
    try {
      const newEnquiry = new this.enquiryModel(enquiryData);
      const saved = await newEnquiry.save();

      const emailDomain = saved.email.split('@')[1]?.toLowerCase() || '';
      let extraMsg = '';
      let providerNote = '';

      if (emailDomain.includes('gmail.com')) {
        extraMsg = `Hey ${saved.fullName.split(' ')[0]}! Thanks for connecting via Gmail. We'll reach out to you shortly `;
        providerNote = `Gmail detected — sending confirmation via Google Mail servers.`;
      } else if (emailDomain.includes('yahoo.com')) {
        extraMsg = `Hi ${saved.fullName.split(' ')[0]}, nice to see a Yahoo user!`;
        providerNote = `Yahoo Mail detected — preparing response for Yahoo servers.`;
      } else if (
        emailDomain.includes('outlook.com') ||
        emailDomain.includes('hotmail.com')
      ) {
        extraMsg = `Hello ${saved.fullName.split(' ')[0]}, your Outlook account is verified! We'll be in touch soon.`;
        providerNote = `Outlook detected — message will be sent through Microsoft servers.`;
      } else {
        extraMsg = `Thanks ${saved.fullName.split(' ')[0]}! We'll contact you soon.`;
        providerNote = `Custom email provider detected — using default email handler.`;
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "rs5045280@gmail.com",
          pass: "ggkowzeadrxbxtof",
        },
      });

      const mailOptions = {
        from: `"Caki Stock Market" <${process.env.EMAIL_USER}>`,
        to: saved.email,
        subject: 'Thank You for Your Enquiry ',
        html: `
          <h2>Hello ${saved.fullName},</h2>
          <p>We received your enquiry regarding <b>${saved.serviceRequired}</b>.</p>
          <p>${extraMsg}</p>
          <hr/>
          <p><b>Partner Type:</b> ${saved.partnerType}</p>
          <p><b>Phone:</b> ${saved.phoneNumber}</p>
          <p><b>Additional Requirement:</b> ${saved.additionalRequirements}</p>
          <br/>
          <p style="color:gray">— Caki Stock Market Support Team</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return {
        status: 'success',
        message: extraMsg,
        providerInfo: providerNote,
        result: saved,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create enquiry: ' + error.message,
      );
    }
  }

  async findAll() {
    const enquiries = await this.enquiryModel.find().sort({ createdAt: -1 });
    return {
      status: 'success',
      message:
        enquiries.length > 0
          ? 'All enquiries fetched successfully!'
          : 'No enquiries found',
      count: enquiries.length,
      result: enquiries,
    };
  }
  
  async findOne(id: string) {
    const enquiry = await this.enquiryModel.findById(id);
    if (!enquiry) throw new InternalServerErrorException('Enquiry not found');
    return {
      status: 'success',
      message: 'Enquiry fetched successfully!',
      result: enquiry,
    };
  }

  async update(id: string, updateData: any) {
    const updated = await this.enquiryModel.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true },
    );
    if (!updated)
      throw new InternalServerErrorException('Failed to update enquiry');
    return {
      status: 'success',
      message: 'Enquiry updated successfully!',
      result: updated,
    };
  }

  async delete(id: string) {
    const deleted = await this.enquiryModel.findByIdAndDelete(id);
    if (!deleted)
      throw new InternalServerErrorException('Failed to delete enquiry');
    return {
      
      status: 'success',
      message: 'Enquiry deleted successfully!',
      result: deleted,
    };
  }
}
