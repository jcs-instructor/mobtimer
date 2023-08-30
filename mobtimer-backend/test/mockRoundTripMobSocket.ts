import { Controller, FrontendMobSocket } from 'mobtimer-api';

export class MockRoundTripMobSocket extends FrontendMobSocket {
  frontendMobSocket?: FrontendMobSocket;
  controller?: Controller;
}


