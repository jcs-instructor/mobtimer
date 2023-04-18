import { MobSocketClient } from "mobtimer-api";
import { MobTimer } from "mobtimer-api";
import { soundSource } from "../assets/soundSource";

// todo: unhardcode port
const url =
  process.env.REACT_APP_WEBSOCKET_URL ||
  `ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || "4000"}`;
console.log("process.env", process.env);
export const client = MobSocketClient.openSocketSync(url);
console.log("url", url);

export const frontendMobTimer = createFrontendMobTimer();

function createFrontendMobTimer() {
  const mobTimer = new MobTimer("front-end-timer");
  mobTimer.timerExpireFunc = () => {
    console.log("timer expired on front end");
    const audio = new Audio(soundSource);
    audio.play();
  };
  return mobTimer;
}
