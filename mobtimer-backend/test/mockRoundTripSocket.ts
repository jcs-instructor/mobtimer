import { IClientSocket, Client } from "../src/mobtimer-api";
import { backendUtils } from "../src/server/backendUtils";

export class MockRoundTripSocket implements IClientSocket {
  
  client?: Client;

  sendToServer = (message: string) => {
    backendUtils.processRequest(message, this);
  };

  closeSocket = () => (this.socketState = this.CLOSED_CODE);

  OPEN_CODE = 1;
  CLOSED_CODE = 2;
  socketState = this.OPEN_CODE;

  onmessageReceived = (message: { data: any }) => {
    console.log(message);
  }
}


