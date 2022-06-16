export function joinMessage(mobName: string) {
  return JSON.stringify({ action: "join", mobName });
}

export function updateMessage(durationMinutes: number) {
  return JSON.stringify({ action: "update", value: { durationMinutes } });
}

export function pauseMessage() {
  return JSON.stringify({ action: "pause" });
}

export function startMessage() {
  return JSON.stringify({ action: "start" });
}

export function resumeMessage() {
  return JSON.stringify({ action: "resume" });
}

