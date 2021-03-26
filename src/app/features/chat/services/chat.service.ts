import * as signalR from '@microsoft/signalr';
import { EventEmitter } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ChatMessage } from '../pages/models/chat-message.model';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/core/services/token.service';

export class LiveChatService {
  newMessageEvent = new EventEmitter<ChatMessage>();

  private _hubConnection: signalR.HubConnection;

  constructor(private tokenService: TokenService) {}

  initializeConnection(): Observable<void> {
    const token = this.tokenService.token;
    this._hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(environment.url.tabletopApi + '/hub/room-chat', {
        accessTokenFactory: () => token,
      })
      .build();

    this.assignNewMessageReceived();

    return from(this._hubConnection.start());
  }

  sendMessage(message: string): void {
    this._hubConnection.send('SendMessage', message);
  }

  join(): void {
    this._hubConnection.send('Join');
  }

  leave(): void {
    this._hubConnection.send('Leave');
  }

  private assignNewMessageReceived(): void {
    this._hubConnection.on(
      'SendMessage',
      (username: string, message: string) => {
        const newMessage: ChatMessage = { username, message };
        this.newMessageEvent.emit(newMessage);
      }
    );
  }
}
