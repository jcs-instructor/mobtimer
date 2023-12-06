import { IClientSocket, Client } from "../src/mobtimer-api";
import { backendUtils } from "../src/server/backendUtils";

export class MockClientSocket implements IClientSocket {
  
  client?: Client;

  // As a mock socket, we directly call the server rather than sending a message to the server.
  sendToServer = (message: string) => {
    backendUtils.processRequest(message, this);
  };

  closeSocket = () => (this.socketState = this.CLOSED_CODE);

  OPEN_CODE = 1;
  CLOSED_CODE = 2;
  socketState = this.OPEN_CODE;

  // As a mock socket, we never receive a message from the server, so this never gets called.
  onmessageReceived = (message: { data: any }) => {
    console.log(message);
  }
}


