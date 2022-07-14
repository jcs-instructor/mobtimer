import { Status } from "../status";

export type MobState = {
  mobName: string;
  status: Status;
  durationMinutes: number;
  secondsRemaining: number;
};

export type Action = "update" | "start" | "pause" | "resume" | "expired";

export type MobTimerResponse = {
  actionInfo: { action: Action };
  mobState: MobState;
};

/*
export type MobTimerResponse = {
  actionInfo {
    timestamp: …; 
    action: “update”, “start”, “pause”, “expired” (push notification),
    origin: “server” | “client”
}
  mobState {
    mobName: string;
    status: Status;
    durationMinutes: number;
    secondsRemaining: number; 
}
};

*/
