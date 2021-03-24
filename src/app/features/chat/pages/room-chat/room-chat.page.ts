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
  constructor() {}

  ngOnInit(): void {
    this._roomChatService.initializeNewUserConnection();
    this._roomChatService.newMessageEvent
      .pipe(tap((x) => this.messages.push(x)))
      .subscribe();
  }
}
