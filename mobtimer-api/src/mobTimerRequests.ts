import { Action } from "./action";

export type MobTimerRequest =
  | EchoRequest
  | JoinRequest
  | UpdateRequest
  | AddParticipantRequest
  | RotateParticipantsRequest
  | StartRequest
  | PauseRequest
  | ResetRequest;

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

export type AddParticipantRequest = {
  action: Action.AddParticipant;
  name: string 
};

export type RotateParticipantsRequest = {
  action: Action.RotateParticipants;
  name: string 
};

export type StartRequest = {
  action: Action.Start;
};

export type PauseRequest = {
  action: Action.Pause;
};

export type ResetRequest = {
  action: Action.Reset;
};
