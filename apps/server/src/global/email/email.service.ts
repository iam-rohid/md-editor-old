import * as nodemailer from 'nodemailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailOptions, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;
  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: parseInt(this.config.get('SMTP_PORT')),
      secure: this.config.get('SMTP_SECURE') === 'true',
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendEmail(payload: SendMailOptions) {
    try {
      const info = await this.transporter.sendMail({
        ...payload,
        from: `AmarMerch <${this.config.get('SMTP_USER')}>`,
      });
      return info;
    } catch (e) {
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
