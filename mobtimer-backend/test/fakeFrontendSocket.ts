import { Controller, Client } from "mobtimer-api";
import { IClientSocket } from "../../mobtimer-api/src/iClientSocket";

export class FakeClientSocket implements IClientSocket {
  client?: Client;
  controller?: Controller;
  sendToServer = (message: string) => {
    throw new Error(`${message} not sent.  sendToServer not implemented.`);
   };
  closeSocket = () => this.socketState = this.CLOSED_CODE;
  OPEN_CODE = 1;
  CLOSED_CODE = 2;
  socketState = this.OPEN_CODE;
  onmessageReceived: (message: { data: any; }) => void;

}


