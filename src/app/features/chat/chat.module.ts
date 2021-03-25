import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomChatPage } from './pages/room-chat/room-chat.page';
import { ChatRoutesModule } from './chat.routes';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoomChatPage],
  imports: [CommonModule, ChatRoutesModule, FormsModule],
  providers: []
})
export class ChatModule {}
