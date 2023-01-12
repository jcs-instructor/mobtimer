import { Action } from "./action";

export type MobTimerRequest =
  | EchoRequest
  | JoinRequest
  | UpdateRequest
  | StartRequest
  | PauseRequest;

export type EchoRequest = {
  action: Action.Echo;
};

export type JoinRequest = {
  action: Action.Join;
  mobName: string;
};

export type UpdateRequest = {
  action: Action.Update;
  value: { durationMinutes?: number };
};

export type StartRequest = {
  action: Action.Start;
};

export type PauseRequest = {
  action: Action.Pause;
};
