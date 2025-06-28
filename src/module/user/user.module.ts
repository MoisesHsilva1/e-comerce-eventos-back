import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/module/user/model/user.model';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class userModule {}
