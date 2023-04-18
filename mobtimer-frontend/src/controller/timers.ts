import { soundSource } from "../assets/soundSource";
import { createFrontendMobTimer } from "./timerController";
import { client } from "./timerController";

export const frontendMobTimer = createFrontendMobTimer(playAudio);

function playAudio() {
  console.log("timer expired on front end");
  const audio = new Audio(soundSource);
  audio.play();
}

export { client };