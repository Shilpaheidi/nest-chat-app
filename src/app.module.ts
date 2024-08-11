import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'host',
      database: 'chat_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ChatModule,
  ],
})
export class AppModule {}
