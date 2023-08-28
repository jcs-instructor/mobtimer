import { IFrontendSocket } from "../../mobtimer-api/src/iFrontendSocket";
import { backendUtils } from "../src/server/backendUtils";
import { fakeFrontendSocket } from './fakeFrontendSocket';
import { FrontendMobSocket } from 'mobtimer-api';
import WebSocket from "ws";

export class MockRoundTripMobSocket extends FrontendMobSocket {
  frontendMobSocket?: FrontendMobSocket;c

}


