import { IFrontendSocket } from "../../mobtimer-api/src/iFrontendSocket";
import { backendUtils } from "../src/server/backendUtils";
import { fakeFrontendSocket } from './fakeFrontendSocket';
import { FrontendMobSocket } from 'mobtimer-api';

export class MockRoundTripSocket implements IFrontendSocket {
  frontendMobSocket?: FrontendMobSocket;
  sendToServer = (message: string) => {
    backendUtils.onStringRequest(message, this);
  };
  closeSocket = () => (this.socketState = this.CLOSED_CODE);
  OPEN_CODE = 1;
  CLOSED_CODE = 2;
  socketState = this.OPEN_CODE;
  onmessageReceived = (message: { data: any }) => {console.log(message)}
}


