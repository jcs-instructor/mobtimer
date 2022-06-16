import { Status } from "./status";

export type MobTimerResponse = {
  mobName: string;
  status: Status;
  durationMinutes: number;
}

export type MobTimerRequest = SimpleMobTimerRequest | JoinRequest | UpdateRequest;

export type SimpleMobTimerRequest = {
  action: "pause" | "start" | "resume";
}

export type JoinRequest = {
  action: "join";
  mobName: string;
};

export function joinMessage(mobName: string) {
  return JSON.stringify({ action: "join", mobName } as JoinRequest);
}

export type UpdateRequest = {
  action: "update";
  value: { durationMinutes?: number };
};

export function updateMessage(durationMinutes: number) {
  return JSON.stringify({
    action: "update",
    value: { durationMinutes },
  } as UpdateRequest);
}

export function pauseMessage() {
  return JSON.stringify({ action: "pause" } as SimpleMobTimerRequest);
}

export function startMessage() {
  return JSON.stringify({ action: "start" } as SimpleMobTimerRequest);
}

export function resumeMessage() {
  return JSON.stringify({ action: "resume" } as SimpleMobTimerRequest);
}
