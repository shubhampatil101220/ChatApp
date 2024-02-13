import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public connection : signalR.HubConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/chat")
  .configureLogging(signalR.LogLevel.Information)
  .build();

  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages$ = new BehaviorSubject<any>([]);
  public users$ = new BehaviorSubject<string[]>([]);

  public messages: any[]=[];
  public users: string[]=[];
  constructor() { 
       this.start();
       this.connection.on("ReceiveMessage", (user:string, message:string,messageTime:string) => {
       this.messages = [...this.messages,{user,message,messageTime}];
       this.messages$.next(this.messages); });
       this.connection.on("ConnectedUser",(users:any)=>{
       this.connectedUsers$.next(users); });

}

    //start connection
    public async start(){
      try {
        await this.connection.start();
        console.log("Connection Established");
        
      } catch (error) {
        console.log(error);
        // setTimeout(() => {
        //   this.start();
        // }, 5000);
      }
    }//join ROOM
  public async joinRoom(user:string,room:string){
   
    console.log("service invoked");
    return this.connection.invoke("JoinRoom", {user, room});
  }
  // Send Messages
  public async sendMessage(message:string){
    return this.connection.invoke("SendMessage", message);
  }
  //leave Room
  public async leaveChat(){
    return this.connection.stop();
  }
}
