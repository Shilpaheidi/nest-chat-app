// src/user/user.controller.ts
import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  async createUser(
    @Query('username') username: string,
    @Query('password') password: string,
  ): Promise<User> {
    return this.userService.createUser(username, password);
  }
  @Get(':username')
  async findUser(@Param('username') username: string): Promise<User> {
    return this.userService.findUser(username);
  }
}
