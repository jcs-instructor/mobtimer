import { Status } from "./status";
import * as MobTimerResponses from "./mobTimerResponse";
import { Client } from "./client";
import { MobTimer } from "./mobTimer";
console.log("Controller redeployed 3");

export class Controller {
  
  static staticController: Controller = new Controller();

  // todo: document.title shouldn't be here (it's a UI concern)
  public updateSummary() {
    // todo: Unhardcode refactor roles to be a class with a name and emoji in separate properties; also don't assume just 2 roles
    let participantsString =
      this.createListOfParticipantsWithRoleEmojisPrepended();
    document.title = `${this.statusSymbolText()}${
      this.secondsRemainingStringWithoutLeadingZero
    } ${participantsString} - ${this.getAppTitle()}`;
  }

  public createListOfParticipantsWithRoleEmojisPrepended(): string {
    const participantsCount = this.frontendMobTimer.participants.length;
    const rolesCount = this.frontendMobTimer.roles.length;
    const minCount = Math.min(participantsCount, rolesCount);

    let participants = [] as string[];
    if (minCount > 0) {
      // build up a participant string with the role emoji prefix
      for (let i = 0; i < minCount; i++) {
        const rolePrefix = this.extractFirstEmoji(
          this.frontendMobTimer.roles[i]
        );
        const participant = this.frontendMobTimer.participants[i];
        const combo = `${rolePrefix}${participant}`;
        participants.push(combo);
      }
      // if there are more participants than roles, add the remaining participants without a role prefix
      if (participantsCount > rolesCount) {
        for (let i = rolesCount; i < participantsCount; i++) {
          const participant = this.frontendMobTimer.participants[i];
          participants.push(participant);
        }
      }
    }
    return participants.join(",");
  }

  extractFirstEmoji(str: string): string {
    // Regex is copied from: https://unicode.org/reports/tr51/
    const emojiRegex =
      /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}(\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?))*/gu;
    const match = str.match(emojiRegex);
    return match ? match[0] : "";
  }

  get secondsRemainingStringWithoutLeadingZero() {
    const secondsRemainingString = this.frontendMobTimer.secondsRemainingString;
    return secondsRemainingString.startsWith("0")
      ? secondsRemainingString.substring(1)
      : secondsRemainingString;
  }

  statusSymbolText() {
    let symbol = "";
    switch (this.frontendMobTimer.status) {
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

  frontendMobTimer: MobTimer = new MobTimer("");
  client?: Client;

  getAppTitle() {
    return "Mob Timer";
  }


  // other functions -----------------------

  translateResponseData(response: MobTimerResponses.SuccessfulResponse) {
    const mobState = response.mobState;
    const mobStatus = mobState.status;
    const durationMinutes = mobState.durationMinutes;
    const participants = mobState.participants;
    const roles = mobState.roles;
    const secondsRemaining = mobState.secondsRemaining;
    return {
      mobStatus,
      durationMinutes,
      participants,
      roles,
      secondsRemaining,
    };
  }

  getActionButtonLabel(backendStatus: Status) {
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

  toggleStatus(client: Client, frontendMobtimer: MobTimer) {
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

  getUrl(useLocalHost: boolean) {
    console.log(
      "REACT_APP_LOCAL_WEBSOCKET_URL",
      process.env.REACT_APP_LOCAL_WEBSOCKET_URL
    );
    console.log(
      "REACT_APP_DEPLOYED_WEBSOCKET_URL",
      process.env.REACT_APP_DEPLOYED_WEBSOCKET_URL
    );
    return useLocalHost
      ? process.env.REACT_APP_LOCAL_WEBSOCKET_URL || "ws://localhost:4000"
      : process.env.REACT_APP_DEPLOYED_WEBSOCKET_URL ||
          "ws://mobtimer-backend-pj2v.onrender.com";
  }

  changeFrontendStatus(frontendMobtimer: MobTimer, newStatus: Status) {
    if (frontendMobtimer.status !== newStatus) {
      switch (newStatus) {
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
