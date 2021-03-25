import { Component, OnInit } from '@angular/core';
import { LiveChatService } from '../../services/chat.service';
import { tap } from 'rxjs/operators';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  templateUrl: './room-chat.page.html',
  styleUrls: ['./room-chat.page.less'],
})
export class RoomChatPage implements OnInit {
  private _roomChatService = new LiveChatService();

  messages: ChatMessage[] = [];

  messageToSend: string;
  constructor() {}

  ngOnInit(): void {
    this._roomChatService
      .initializeConnection()
      .pipe(tap(() => this._roomChatService.join()))
      .subscribe();

    this._roomChatService.newMessageEvent
      .pipe(tap((x) => this.messages.push(x)))
      .subscribe();
  }

  send() {
    this._roomChatService.sendMessage(this.messageToSend);
  }
}
