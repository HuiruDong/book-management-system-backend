import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  // 注册接口
  @Post('register')
  // 通过 @Body 获取请求体
  register(@Body() registerUserDto: RegisterUserDto): string {
    console.log("🚀 ~ UserController ~ register ~ registerUserDto:", registerUserDto)
    return 'done'
  }
  
}
