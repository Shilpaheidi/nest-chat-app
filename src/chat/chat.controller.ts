// src/chat/chat.controller.ts
import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { UserService } from '../user/user.service';

@Controller('chats')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService, // Inject UserService here
  ) {}

  @Post()
  async saveMessage(@Body() body: { message: string; username: string }): Promise<Chat> {
    const { message, username } = body;
    const user = await this.userService.findUser(username);
    if (!user) {
      throw new Error('User not found');
    }
    return this.chatService.saveMessage(message, user);
  }

  @Get()
  async getMessages(): Promise<Chat[]> {
    return this.chatService.getMessages();
  }
}
