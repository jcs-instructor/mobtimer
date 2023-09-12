// import { MobTimerResponses } from "mobtimer-api";
import { Client } from "mobtimer-api";
export declare function waitForSocketState(
  socket: {
    readyState: number;
  },
  state: number
): Promise<void>;
export declare function waitForLastResponse(
  socket: Client
): Promise<void>;
// export declare function convertToMobTimerResponse(
//   response: string
// ): MobTimerResponse;
