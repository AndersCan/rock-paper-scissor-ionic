import { Room, Client } from "colyseus";

// Room<T> where T is the room State.
export class ChatRoom extends Room<any> {

  constructor(options: any) {
    super(options);
    this.setPatchRate(1000);
    this.setState({ messages: [] });
    console.log("ChatRoom created!", options);
  }

  onJoin(client: Client) {
    this.state.messages.push(`${client.id} joined.`);
  }

  onLeave(client: Client) {
    this.state.messages.push(`${client.id} left.`);
  }

  onMessage(client: Client, data: any) {
    this.state.messages.push(data.message);
    console.log("ChatRoom:", client.id, data);
  }

  onDispose() {
    console.log("Dispose ChatRoom");
  }

}