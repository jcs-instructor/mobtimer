export type MobTimerRequest =
  | JoinRequest
  | UpdateRequest
  | StartRequest
  | PauseRequest
  | ResumeRequest;

export type JoinRequest = {
  action: "join";
  mobName: string;
};

export type UpdateRequest = {
  action: "update";
  value: { durationMinutes?: number };
};

export type StartRequest = {
  action: "start";
};

export type PauseRequest = {
  action: "pause";
};

export type ResumeRequest = {
  action: "resume";
};

export function joinRequest(mobName: string) {
  return JSON.stringify({ action: "join", mobName } as JoinRequest);
}

export function updateRequest(durationMinutes: number) {
  return JSON.stringify({
    action: "update",
    value: { durationMinutes },
  } as UpdateRequest);
}

export function startRequest() {
  return JSON.stringify({ action: "start" } as StartRequest);
}

export function pauseRequest() {
  return JSON.stringify({ action: "pause" } as PauseRequest);
}

export function resumeRequest() {
  return JSON.stringify({ action: "resume" } as ResumeRequest);
}
