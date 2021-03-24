import * as signalR from '@microsoft/signalr';
import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ChatMessage } from '../pages/models/chat-message.model';

export class LiveChatService {
  public newMessageEvent = new EventEmitter<ChatMessage>();

  private _hubConnection: signalR.HubConnection;

  constructor() {}

  public initializeNewUserConnection(): Observable<void> {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/room-chat')
      .build();

    this.assignNewMessageReceived();

    return from(this._hubConnection.start());
  }

  public sendNewMessage(message: string): void {
    this._hubConnection.send('NewMessage', message);
  }

  private assignNewMessageReceived(): void {
    this._hubConnection.on(
      'NewMessage',
      (username: string, message: string) => {
        const newMessage: ChatMessage = { username, message };
        this.newMessageEvent.emit(newMessage);
      }
    );
  }
}
