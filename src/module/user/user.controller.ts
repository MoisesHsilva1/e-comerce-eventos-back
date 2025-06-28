import { Body, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './service/user.service';
import { User } from 'src/module/user/model/user.model';
import { CreateUserDto } from './dto/createuser.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/create')
  @ApiOperation({ summary: 'Create users' })
  @ApiResponse({ status: 201, description: 'Success' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { email, name } = createUserDto;

    const newUser = await this.userService.create({
      email,
      name,
    });

    return newUser;
  }
}
