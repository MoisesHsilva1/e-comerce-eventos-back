import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './service/user.service';
import { FirebaseGuard, FirebaseUser } from '@alpha018/nestjs-firebase-auth';
import { User } from 'src/module/user/model/user.model';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(FirebaseGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create users' })
  @ApiResponse({ status: 201, description: 'Success' })
  async createUser(@FirebaseUser() firebaseUser): Promise<User> {
    const { uid, email, name } = firebaseUser;

    const newUser = await this.userService.create({
      uid,
      email,
      name,
    });

    return newUser;
  }
}
