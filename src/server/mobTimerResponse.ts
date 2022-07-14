import { Status } from "../status";

export type MobTimerResponse = {
  mobName: string;
  status: Status;
  durationMinutes: number;
  secondsRemaining: number;
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