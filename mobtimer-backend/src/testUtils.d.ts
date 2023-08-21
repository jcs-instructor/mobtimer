// import { MobTimerResponses } from "mobtimer-api";
import { FrontendMobSocket } from "mobtimer-api";
export declare function waitForSocketState(
  socket: {
    readyState: number;
  },
  state: number
): Promise<void>;
export declare function waitForLastResponse(
  socket: FrontendMobSocket
): Promise<void>;
// export declare function convertToMobTimerResponse(
//   response: string
// ): MobTimerResponse;
