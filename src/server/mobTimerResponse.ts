import { Status } from "../status";

export type MobState = {
  mobName: string;
  status: Status;
  durationMinutes: number;
  secondsRemaining: number;
};

export type Action = "join" | "update" | "start" | "pause" | "resume" | "expired";

export type MobTimerResponse = {
  actionInfo: { action: Action };
  mobState: MobState;
};
