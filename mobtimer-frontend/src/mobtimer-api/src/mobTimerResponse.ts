import { Action } from "./action";
import { MobState } from "./mobState";

export type MobTimerResponse = 
  | SuccessfulResponse
  | ErrorResponse
  | EchoResponse;

export type SuccessfulResponse = {
  actionInfo: { action: Action };
  mobState: MobState;
};

export type ErrorResponse = {
  actionInfo: { action: Action };
};

export type EchoResponse = {
  actionInfo: { action: Action };
};
