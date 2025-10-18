// ✅ src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountingblogModule } from './countingblog/countingblog.module';
import { AddcommentModule } from './addcomment/addcomment.module';
import { DashboardModule } from './create/dashboard/dashboard.module';
import { EnquiryModule } from './enquiry/enquiry.module';
import { PartnershipModule } from './partnership/partnership.module';
import { LoginpageModule } from './loginpage/loginpage.module';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rs5045280:xbpneTRReMJD9LAc@cluster0.sbbouj5.mongodb.net/nest-blog?retryWrites=true&w=majority', {
      serverSelectionTimeoutMS: 4000,
    }),
    ConfigModule.forRoot({
      isGlobal: true, // makes env available everywhere
    }),
    CountingblogModule,
    AddcommentModule,
    DashboardModule,
    EnquiryModule,
    PartnershipModule,
    LoginpageModule,

   

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}