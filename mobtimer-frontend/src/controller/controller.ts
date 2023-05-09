import { IWebSocketWrapper, Status } from "mobtimer-api";
import { MobTimerResponses } from "mobtimer-api";
import { MobSocketClient } from "mobtimer-api";
import { MobTimer } from "mobtimer-api";

export class Controller {
  static updateSummary() {
    // todo: refactor / unhardcode emojis, etc.
    let participantsString = "🗣️" + Controller._participants.join(", ");
    if (Controller._participants.length > 1) {
      participantsString = participantsString.replace(", ", ",🛞");
    }
    document.title = `${Controller.statusSymbolText()}${Controller.secondsRemainingStringWithoutLeadingZero} ${participantsString} - ${Controller.getAppTitle()}`;
  }

  static get secondsRemainingStringWithoutLeadingZero() {
    const secondsRemainingString = Controller.frontendMobTimer.secondsRemainingString;
    return secondsRemainingString.startsWith("0") ? secondsRemainingString.substring(1) : secondsRemainingString;
  }

  static statusSymbolText() {
    let symbol = "";
    switch (Controller.frontendMobTimer.status) {
      case Status.Running: 
        symbol = "▶️";
        break;      
      case Status.Ready: 
      case Status.Paused: 
        symbol = "🟥";
        break;      
      // case Status.Ready: 
      //   symbol = "⏰";
      //   break;      
    }
    return symbol;
  }

  static frontendMobTimer: MobTimer;
  static client: MobSocketClient;

  static initializeClientAndFrontendMobTimer(webSocket: IWebSocketWrapper, timerExpireFunc: () => void) {
    Controller.client = new MobSocketClient(webSocket);
    Controller.frontendMobTimer = new MobTimer("front-end-timer");
    Controller.frontendMobTimer.timerExpireFunc = () => {
      timerExpireFunc();
    };
  }

  static getAppTitle() {
    return "Mob Timer";
  }

  // injections -----------------------

  // inject duration minutes
  static setDurationMinutes = (_durationMinutes: number) => { }; // todo: consider alternatives to putting an underscore in the name; e.g., try abstract method/class, or interface
  static injectSetDurationMinutes(setDurationMinutesFunction: (durationMinutes: number) => void) {
    this.setDurationMinutes = setDurationMinutesFunction;
  }

  // inject time string
  static setSecondsRemainingString = (_timeString: string) => { }; // todo: consider alternatives to putting an underscore in the name; e.g., try abstract method/class, or interface
  static injectSetSecondsRemainingString(setSecondsRemainingStringFunction: (timeString: string) => void): void {
    this.setSecondsRemainingString = (timeString: string) => {
      setSecondsRemainingStringFunction(timeString);
      Controller.updateSummary();
    }
  }

  // inject participants
  static setParticipants = (_participants: string[]) => { }; // todo: consider alternatives to putting an underscore in the name; e.g., try abstract method/class, or interface
  static injectSetParticipants(setParticipantsFunction: (participants: string[]) => void) {
    this.setParticipants = setParticipantsFunction;
    Controller.updateSummary();
  }

  // inject roles
  static setRoles = (_roles: string[]) => { }; // todo: consider alternatives to putting an underscore in the name; e.g., try abstract method/class, or interface
  static injectSetRoles(setRolesFunction: (roles: string[]) => void) {
    this.setRoles = setRolesFunction;
    Controller.updateSummary();
  }

  // other functions -----------------------

  static translateResponseData(response: MobTimerResponses.SuccessfulResponse) {
    const mobState = response.mobState;
    const mobStatus = mobState.status;
    const durationMinutes = mobState.durationMinutes;
    const participants = mobState.participants;
    Controller._participants = participants;
    const roles = mobState.roles;
    Controller._roles = roles;
    const secondsRemaining = mobState.secondsRemaining;
    return { mobStatus, durationMinutes, participants, roles, secondsRemaining };
  }

  static _participants: string[] = [];
  static _roles: string[] = [];
  
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
          // frontendMobtimer.start(); // To get into the paused state, the timer must have been running, so make sure to start before pause to be sure; otherwise a bug can occur.    
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

