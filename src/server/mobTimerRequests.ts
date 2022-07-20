import { Action } from "./mobTimerResponse";

export type MobTimerRequest =
  | JoinRequest
  | UpdateRequest
  | StartRequest
  | PauseRequest
  | ResumeRequest;

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

export type ResumeRequest = {
  action: Action.Resume;
};

export function joinRequest(mobName: string) {
  return JSON.stringify({ action: Action.Join, mobName } as JoinRequest);
}

export function updateRequest(durationMinutes: number) {
  return JSON.stringify({
    action: Action.Update,
    value: { durationMinutes },
  } as UpdateRequest);
}

export function startRequest() {
  return JSON.stringify({ action: Action.Start } as StartRequest);
}

export function pauseRequest() {
  return JSON.stringify({ action: Action.Pause } as PauseRequest);
}

export function resumeRequest() {
  return JSON.stringify({ action: Action.Resume } as ResumeRequest);
}
