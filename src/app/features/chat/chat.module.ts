import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomChatPage } from './pages/room-chat/room-chat.page';
import { ChatRoutesModule } from './chat.routes';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RoomChatPage],
  imports: [CommonModule, ChatRoutesModule, FormsModule, HttpClientModule],
  providers: [AuthService],
})
export class ChatModule {}
