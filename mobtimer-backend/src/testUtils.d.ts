import { MobTimerResponse } from "mobtimer-api";
import { MobSocketClient } from "./mobSocketClient";
export declare function waitForSocketState(socket: {
    readyState: number;
}, state: number): Promise<void>;
export declare function waitForLastResponse(socket: MobSocketClient): Promise<void>;
export declare function convertToMobTimerResponse(response: string): MobTimerResponse;
