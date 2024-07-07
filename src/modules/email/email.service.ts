import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/user.dto';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { TwoFa } from 'src/entity/verification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
dotenv.config();

export const code = Math.floor(Math.random() * 100000);

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(TwoFa)
    private verificationRepo: Repository<TwoFa>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async sendMail(email: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
  }

  async sendUserConfirmation(user: CreateUserDto) {
    const link = 'http://localhost:4000/email/confirm-email';
    const subject = 'Confirm registered email';
    const text = `Click the link ${link} to enter confirmation code <> ${code} <>`;
    await this.sendMail(user.email, subject, text)
  }

  public async confirmEmail(code: string) {
    try {
      const verifyCode = await this.verificationRepo.findOneBy({ twoFaCode: code });
      if (verifyCode) {
        await this.verificationRepo.delete({ id: verifyCode.id });
        await this.userRepo.update(verifyCode?.userId, { verifiedEmail: 1 });
        return {success: true, message: 'Email confirmed'};
      } else {
        return {success: false, message: 'Verification token is incorrect. Email could not be verified'};
      }
  
    } catch (error) {
      console.log(error);
    }
  }
  
  public async confirmTwoFaCode(userId: number, code: string) {
    try {
      const verifyCode = await this.verificationRepo.findOneBy({ userId, twoFaCode: code });
      console.log(verifyCode)
      if (verifyCode) {
        await this.verificationRepo.delete({ id: verifyCode.id });
        return true;
      } else {
        return false;
      }
  
    } catch (error) {
      console.log(error);
    }
  }

  public async sendTwoFaCode(userId: number, email: string) {
    try {
      const twoFaCode = code.toString();
      const existingUserToken = await this.verificationRepo.findOneBy({ userId });
      if (existingUserToken) {
        await this.verificationRepo.delete({ userId });
      }
      await this.verificationRepo.save(new TwoFa({ userId: userId, twoFaCode }));
      const subject = 'Authentication Code'
      const text = `Use this authentication code < ${code} > to confirm your email.`;
      await this.sendMail(email, subject, text);
  
    } catch (error) {
      console.log(error);
    }
  }

}
