import { Component, OnInit } from '@angular/core';
import { LiveChatService } from '../../services/chat.service';
import { tap } from 'rxjs/operators';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  templateUrl: './room-chat.page.html',
  styleUrls: ['./room-chat.page.less'],
})
export class RoomChatPage implements OnInit {
  private _roomChatService = new LiveChatService(this.tokenService);

  messages: ChatMessage[] = [];
  messageToSend: string;

  chatInitialized = false;

  constructor(private authService: AuthService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.authService
      .signIn({ username: 'soras', password: '123456' })
      .pipe(tap(() => this.initChat()))
      .subscribe();
  }

  private initChat() {
    this._roomChatService
      .initializeConnection()
      .pipe(
        tap(() => {
          this.subscribeToChatEvents();
          this._roomChatService.join();
          this.chatInitialized = true;
        })
      )
      .subscribe();
  }

  private subscribeToChatEvents() {
    this._roomChatService.newMessageEvent
      .pipe(tap((x) => this.messages.push(x)))
      .subscribe();
  }

  send() {
    this._roomChatService.sendMessage(this.messageToSend);
  }
}
