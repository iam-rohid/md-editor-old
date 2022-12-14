import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
      const user = await this.usersService.create({
        email: signUpDto.email,
        password: hashedPassword,
        fullname: signUpDto.fullname,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      const accessToken = await this.signToken(user);
      return {
        accessToken,
        user: safeUser,
      };
    } catch (e) {
      throw e;
    }
  }

  async logIn(logInDto: LogInDto) {
    try {
      const user = await this.usersService.findOneByEmail(logInDto.email, {
        keepPassword: true,
      });

      const isPasswordMatch = await bcrypt.compare(
        logInDto.password,
        user.password,
      );

      if (!isPasswordMatch) {
        throw new HttpException('Invalid Password', HttpStatus.FORBIDDEN);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      const accessToken = await this.signToken(user);
      return { accessToken, user: safeUser };
    } catch (e) {
      throw e;
    }
  }

  async signToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return await this.jwtService.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
