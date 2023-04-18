import { Status } from "mobtimer-api";
import { MobTimerResponses } from "mobtimer-api";
import { MobSocketClient } from "mobtimer-api";
import { MobTimer } from "mobtimer-api";

// todo: unhardcode port
const url =
  process.env.REACT_APP_WEBSOCKET_URL ||
  `ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || "4000"}`;
console.log("process.env", process.env);
console.log("url", url);

export class Controller {
  static client = MobSocketClient.openSocketSync(url);

  static createFrontendMobTimer(timerExpireFunc: () => void) {
    const mobTimer = new MobTimer("front-end-timer");
    mobTimer.timerExpireFunc = () => {
      timerExpireFunc();
    };
    return mobTimer;
  }

  static getAppTitle() {
    return "Mob Timer";
  }

  // injections -----------------------

  // inject duration minutes
  static setDurationMinutes = (_durationMinutes: number) => {}; // todo: consider alternatives to putting an underscore in the name; e.g., try abstract method/class, or interface
  static injectSetDurationMinutes(
    setDurationMinutesFunction: (durationMinutes: number) => void
  ) {
    this.setDurationMinutes = setDurationMinutesFunction;
  }

  // inject time string
  static setSecondsRemainingString = (_timeString: string) => {}; // todo: consider alternatives to putting an underscore in the name; e.g., try abstract method/class, or interface
  static injectSetSecondsRemainingString(
    setSecondsRemainingStringFunction: (timeString: string) => void
  ) {
    this.setSecondsRemainingString = setSecondsRemainingStringFunction;
  }

  // inject participants
  static setParticipants = (_participants: string[]) => {}; // todo: consider alternatives to putting an underscore in the name; e.g., try abstract method/class, or interface
  static injectSetParticipants(
    setParticipantsFunction: (participants: string[]) => void
  ) {
    this.setParticipants = setParticipantsFunction;
  }

  // other functions -----------------------

  static getStatus(response: MobTimerResponses.SuccessfulResponse) {
    return response.mobState.status;
  }

  static getAction(response: MobTimerResponses.SuccessfulResponse) {
    return response.actionInfo.action;
  }

  static getDurationMinutes(response: MobTimerResponses.SuccessfulResponse) {
    return response.mobState.durationMinutes;
  }

  static getParticipants(response: MobTimerResponses.SuccessfulResponse) {
    return response.mobState.participants;
  }

  static getSecondsRemaining(response: MobTimerResponses.SuccessfulResponse) {
    return response.mobState.secondsRemaining;
  }

  static getActionButtonLabel(backendStatus: Status) {
    switch (backendStatus) {
      case Status.Running: {
        return "⏸️ Pause";
      }
      case Status.Paused: {
        return "▶️ Resume";
      }
      case Status.Ready: {
        return "▶️ Start";
      }
      default: {
        return "";
      } // todo: maybe handle invalid status differently
    }
  }

  static toggle(client: MobSocketClient, frontendMobtimer: MobTimer) {
    switch (frontendMobtimer.status) {
      case Status.Running: {
        client.pause();
        frontendMobtimer.pause();
        break;
      }
      case Status.Paused: {
        client.start();
        frontendMobtimer.start();
        break;
      }
      case Status.Ready: {
        client.start();
        frontendMobtimer.start();
        break;
      }
    }
  }

  static changeStatus(frontendMobtimer: MobTimer, backendStatus: Status) {
    if (frontendMobtimer.status !== backendStatus) {
      switch (backendStatus) {
        case Status.Running: {
          frontendMobtimer.start();
          break;
        }
        case Status.Paused: {
          frontendMobtimer.pause();
          break;
        }
        case Status.Ready: {
          frontendMobtimer.reset();
          break;
        }
      }
    }
  }
}
