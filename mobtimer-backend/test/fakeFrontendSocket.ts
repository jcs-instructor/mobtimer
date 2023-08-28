import { IFrontendSocket } from "../../mobtimer-api/src/iFrontendSocket";

export class fakeFrontendSocket implements IFrontendSocket {
  sendToServer = (message: string) => {
    throw new Error(`${message} not sent.  sendToServer not implemented.`);
   };
  closeSocket = () => this.socketState = this.CLOSED_CODE;
  OPEN_CODE = 1;
  CLOSED_CODE = 2;
  socketState = this.OPEN_CODE;

   public set onmessageReceived(func: any) {
    throw new Error("onmessageReceived not implemented.");    
  }
}


