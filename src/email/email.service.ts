import { Injectable } from '@nestjs/common';
import { userDto } from 'src/dto/user.dto';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from 'src/entity/verification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
dotenv.config();

export const token = Math.floor(Math.random() * 100000);

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepo: Repository<Verification>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async sendUserConfirmation(user: userDto) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const link = 'http://localhost:4000/email/confirm-email';
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Confirm registered email',
      text: `Click the link ${link} to enter confirmation code <> ${token} <>`,
    };
    await transporter.sendMail(mailOptions);
  }

  public async confirmEmail(token: string) {
    const verifyCode = await this.verificationRepo.findOneBy({ token: token });
    if (verifyCode === null)
      return 'Verification token is incorrect. Email could not be verified';

    if (token === verifyCode.token) {
      // Remove token from verificationCode table
      await this.verificationRepo.delete({ token: token });
      await this.userRepo.update(verifyCode.userId, { verifiedEmail: 1 });
      return 'Email confirmed';
    }
  }
}
