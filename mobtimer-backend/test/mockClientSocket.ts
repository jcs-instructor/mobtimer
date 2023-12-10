import { IClientSocket, Client, onmessageReceivedFunc, ListenerParameters } from "../src/mobtimer-api";
import { backendUtils } from "../src/server/backendUtils";

export class MockClientSocket implements IClientSocket {
  
  private _parameters: ListenerParameters;
  client?: Client;
  CONNECTING_CODE = 0;
  OPEN_CODE = 1;
  CLOSING_CODE = 2;
  CLOSED_CODE = 3;
  socketState = this.OPEN_CODE;

  constructor(parameters: ListenerParameters) {
    this._parameters = parameters;
  }

  // As a mock socket, we directly call the server rather than sending a message to the server through a real socket.
  sendToServer = (message: string) => {
    backendUtils.processRequest(message, this);
  };

  // As a mock socket, we directly call the onmessageReceived rather than listening for a message from 
  // the server through a real socket.
  onmessageReceived = (message: { data: any }) => {
    onmessageReceivedFunc(message, this._parameters); //console.log(message);
  }
  
  closeSocket = () => (this.socketState = this.CLOSED_CODE);

}


