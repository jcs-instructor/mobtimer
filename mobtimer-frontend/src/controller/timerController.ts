import { MobSocketClient } from "mobtimer-api";
import { MobTimer } from "mobtimer-api";

// todo: unhardcode port
const url =
  process.env.REACT_APP_WEBSOCKET_URL ||
  `ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || "4000"}`;
console.log("process.env", process.env);
export const client = MobSocketClient.openSocketSync(url);
console.log("url", url);

export function createFrontendMobTimer(timerExpireFunc: () => void ) {
  const mobTimer = new MobTimer("front-end-timer");
  mobTimer.timerExpireFunc = () => { timerExpireFunc(); };
  return mobTimer;
}