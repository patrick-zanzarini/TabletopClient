import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomChatPage } from './pages/room-chat/room-chat.page';

const routes: Routes = [
  {
    path: '',
    component: RoomChatPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutesModule {}
