import { Status } from "../status";

export type MobState = {
  mobName: string;
  status: Status;
  durationMinutes: number;
  secondsRemaining: number;
};

export enum Action {
  Join = "join",
  Update = "update",
  Start = "start",
  Pause = "pause",
  Resume = "resume",
  Expired = "expired",
}

export type MobTimerResponse = {
  actionInfo: { action: Action };
  mobState: MobState;
};
