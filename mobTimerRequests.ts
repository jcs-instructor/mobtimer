
export type MobTimerRequest = SimpleMobTimerRequest | JoinRequest | UpdateRequest;

export type SimpleMobTimerRequest = {
  action: "pause" | "start" | "resume";
}

export type JoinRequest = {
  action: "join";
  mobName: string;
};

export function joinRequest(mobName: string) {
  return JSON.stringify({ action: "join", mobName } as JoinRequest);
}

export type UpdateRequest = {
  action: "update";
  value: { durationMinutes?: number };
};

export function updateRequest(durationMinutes: number) {
  return JSON.stringify({
    action: "update",
    value: { durationMinutes },
  } as UpdateRequest);
}

export function pauseRequest() {
  return JSON.stringify({ action: "pause" } as SimpleMobTimerRequest);
}

export function startRequest() {
  return JSON.stringify({ action: "start" } as SimpleMobTimerRequest);
}

export function resumeRequest() {
  return JSON.stringify({ action: "resume" } as SimpleMobTimerRequest);
}
