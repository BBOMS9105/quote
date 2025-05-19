import { Controller, Post, Body } from '@nestjs/common';
import { Users } from './entity/users.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //회원가입
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.createUser(createUserDto);
  }
}
