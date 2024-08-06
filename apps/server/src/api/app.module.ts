import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SubmitModule } from './submit/submit.module';
import { UsersModule } from './users/users.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    SubmitModule,
    UsersModule,
    UserProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
