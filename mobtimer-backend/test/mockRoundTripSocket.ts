import { IFrontendSocket } from "../../mobtimer-api/src/iFrontendSocket";
import { backendUtils } from "../src/server/backendUtils";
import { Client } from 'mobtimer-api';

export class MockRoundTripSocket implements IFrontendSocket {
  client?: Client;
  sendToServer = (message: string) => {
    backendUtils.processRequest(message, this);
  };
  closeSocket = () => (this.socketState = this.CLOSED_CODE);
  OPEN_CODE = 1;
  CLOSED_CODE = 2;
  socketState = this.OPEN_CODE;
  onmessageReceived = (message: { data: any }) => {console.log(message)}
}


