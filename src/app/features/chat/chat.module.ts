import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomChatPage } from './pages/room-chat/room-chat.page';
import { ChatRoutesModule } from './chat.routes';

@NgModule({
  declarations: [RoomChatPage],
  imports: [CommonModule, ChatRoutesModule],
  providers: []
})
export class ChatModule {}
