export interface MobTimerRequest {
  action: string;
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
  return JSON.stringify({ action: "pause" } as MobTimerRequest);
}

export function startMessage() {
  return JSON.stringify({ action: "start" } as MobTimerRequest);
}

export function resumeMessage() {
  return JSON.stringify({ action: "resume" } as MobTimerRequest);
}
