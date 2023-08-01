import { MobTimerResponse, SuccessfulResponse } from "./mobTimerResponse";
import { Action } from "./action";
import { MobSocketClient } from "./mobSocketClient";
import { MobState } from "./mobState";
import { IWebSocketWrapper } from "./iWebSocketWrapper";
import { MobTimerRequests } from "mobtimer-api";

class MobRequestBuilder {
  static joinMob(mobName: string): string {
    const request = {
      action: Action.Join,
      mobName,
    } as MobTimerRequests.JoinRequest;
    return JSON.stringify(request);
  }
}

export { MobRequestBuilder };
