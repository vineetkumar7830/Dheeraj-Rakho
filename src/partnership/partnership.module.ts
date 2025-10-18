import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnershipService } from './partnership.service';
import { PartnershipController } from './partnership.controller';
import { Partnership, PartnershipSchema } from './entities/partnership.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partnership.name, schema: PartnershipSchema }]),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'rs5045280@gmail.com', 
          pass: 'ggkowzeadrxbxtof',    
        },
      },
      defaults: {
        from: '"Hiverift Contact" <hiverift-support@hiverift.com>',
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
  ],
  controllers: [PartnershipController],
  providers: [PartnershipService],
  exports: [PartnershipService],
})
export class PartnershipModule {}
