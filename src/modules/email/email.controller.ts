import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('confirm-email')
  public async confirmEmail(@Body() token) {
    return await this.emailService.confirmEmail(token.token);
  }
}
