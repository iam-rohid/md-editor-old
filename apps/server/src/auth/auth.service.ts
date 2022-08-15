import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfilesService } from 'src/profiles/profiles.service';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private profilesService: ProfilesService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
      const user = await this.usersService.create({
        email: signUpDto.email,
        password: hashedPassword,
      });
      const profile = await this.profilesService.create({
        fullname: signUpDto.fullname,
        userId: user.id,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      return {
        user: {
          ...safeUser,
          profile,
        },
      };
    } catch (e) {
      throw e;
    }
  }

  async logIn(logInDto: LogInDto) {
    try {
      const user = await this.usersService.findOneByEmail(logInDto.email);
      console.log({ user });
      const isPasswordMatch = await bcrypt.compare(
        logInDto.password,
        user.password,
      );

      if (!isPasswordMatch) {
        throw new HttpException('Invalid Password', HttpStatus.FORBIDDEN);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      return {
        user: safeUser,
      };
    } catch (e) {
      throw e;
    }
  }
}
