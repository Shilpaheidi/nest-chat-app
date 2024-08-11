import { WebSocketGateway, SubscribeMessage, MessageBody, WsException } from '@nestjs/websockets';
import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { UserService } from '../user/user.service'; // Import UserService

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService, // Inject UserService
  ) {}

  afterInit(server: any) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: { username: string; message: string }) {
    const user = await this.userService.findUser(data.username);
    if (!user) {
      throw new WsException('User not found');
    }
    const chat = await this.chatService.saveMessage(data.message, user);
    return chat;
  }
}
