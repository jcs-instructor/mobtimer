import { Controller2, FrontendMobSocket } from "mobtimer-api";
import { IFrontendSocket } from "../../mobtimer-api/src/iFrontendSocket";

export class FakeFrontendSocket implements IFrontendSocket {
  frontendMobSocket?: FrontendMobSocket;
  controller?: Controller2;
  sendToServer = (message: string) => {
    throw new Error(`${message} not sent.  sendToServer not implemented.`);
   };
  closeSocket = () => this.socketState = this.CLOSED_CODE;
  OPEN_CODE = 1;
  CLOSED_CODE = 2;
  socketState = this.OPEN_CODE;
  onmessageReceived: (message: { data: any; }) => void;

}


