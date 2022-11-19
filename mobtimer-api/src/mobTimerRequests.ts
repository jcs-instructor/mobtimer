import { Action } from "./action";

export type MobTimerRequest =
  | EchoRequest
  | JoinRequest
  | UpdateRequest
  | ToggleRequest
  | StartRequest
  | PauseRequest
  | ResumeRequest;

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

export type ToggleRequest = {
  action: Action.Toggle;
};

export type StartRequest = {
  action: Action.Start;
};

export type PauseRequest = {
  action: Action.Pause;
};

export type ResumeRequest = {
  action: Action.Resume;
};
