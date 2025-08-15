import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async register(resgisterUserDto: RegisterUserDto) {
    // 从 db 中拿到所有的用户
    const users: User[] = await this.dbService.read();

    // 看看有没有重复的
    const foundUser = users.find(
      (item) => item.username === resgisterUserDto.username,
    );

    if (foundUser) {
      throw new BadRequestException('该用户已注册');
    }

    // 没有就实例化一下，创建一个新用户
    const user = new User();
    user.username = resgisterUserDto.username;
    user.password = resgisterUserDto.password;
    users.push(user);

    // 写到 db 中
    await this.dbService.write(users);
    return user;
  }
}
