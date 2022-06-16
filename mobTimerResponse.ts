import { Status } from "./status";


export type MobTimerResponse = {
  mobName: string;
  status: Status;
  durationMinutes: number;
};
