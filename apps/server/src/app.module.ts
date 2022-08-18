import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { GlobalModule } from './global/global.module';
import { NotesModule } from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';
import { NotebooksModule } from './notebooks/notebooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ProfilesModule,
    GlobalModule,
    NotebooksModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
