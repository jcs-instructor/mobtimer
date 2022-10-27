import { Action } from "./action";
import { v4 as uuidv4 } from "uuid";

export type MobTimerRequest =
    JoinRequest
  | UpdateRequest
  | StartRequest
  | PauseRequest
  | ResumeRequest;

export function getUuid(): string {
  return uuidv4();
};

export type JoinRequest = {
  id: string;
  action: Action.Join;
  mobName: string;
};

export type UpdateRequest = {
  id: string;
  action: Action.Update;
  value: { durationMinutes?: number };
};

export type StartRequest = {
  id: string;
  action: Action.Start;
};

export type PauseRequest = {
  id: string;
  action: Action.Pause;
};

export type ResumeRequest = {
  id: string;
  action: Action.Resume;
};

export function joinRequest(mobName: string) {
  return JSON.stringify({ action: Action.Join, mobName } as JoinRequest);
}

export function updateRequest(durationMinutes: number) {
  return JSON.stringify({
    id: getUuid(), 
    action: Action.Update,
    value: { durationMinutes },
  } as UpdateRequest);
}

export function startRequest() {
  return JSON.stringify({
    id: getUuid(),
    action: Action.Start,
  } as StartRequest);
}

export function pauseRequest() {
  return JSON.stringify({
    id: getUuid(),
    action: Action.Pause,
  } as PauseRequest);
}

export function resumeRequest() {
  return JSON.stringify({
    id: getUuid(),
    action: Action.Resume,
  } as ResumeRequest);
}
