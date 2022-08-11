import { Action } from "./action";
import { MobState } from "./mobState";

export type MobTimerResponse = {
  actionInfo: { action: Action };
  mobState: MobState;
};
