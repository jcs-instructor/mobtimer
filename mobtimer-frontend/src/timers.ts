import { MobSocketClient, MobTimer } from "mobtimer-api";
import { soundSource } from "./assets/soundSource";

// todo: unhardcode port
const url =
  process.env.REACT_WEBSOCKET_URL ||
  `ws://localhost:${process.env.REACT_WEBSOCKET_PORT || ""}`;
export const client = MobSocketClient.openSocketSync(url);

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
