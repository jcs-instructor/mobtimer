import { IClientSocket, Client } from "../src/mobtimer-api";
import { backendUtils } from "../src/server/backendUtils";

export class MockClientSocket implements IClientSocket {
  
  client?: Client;

  // As a mock socket, we directly call the server rather than sending a message to the server through a real socket.
  sendToServer = (message: string) => {
    backendUtils.processRequest(message, this);
  };

  closeSocket = () => (this.socketState = this.CLOSED_CODE);

  OPEN_CODE = 1;
  CLOSED_CODE = 2;
  socketState = this.OPEN_CODE;

  // As a mock socket, we never receive a message from the server, so this never gets called.
  // todo: Currently this is really a dummy not a mock. To make a mock, we could try calling 
  // onmessageReceivedFunc directly here (defined in setSocketListener.ts), possibly passing into
  // this class's constructor a reference to the controller (and anything else needed).
  onmessageReceived = (message: { data: any }) => {
    console.log(message);
  }
}


