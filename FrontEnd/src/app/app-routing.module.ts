import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  
{path:'', redirectTo:'join-room', pathMatch:'full'},
{path:'welcome', component:WelcomeComponent},
{path:'join-room', component:JoinRoomComponent},
{path:'chat', component:ChatComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
