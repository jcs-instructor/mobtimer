import { IWebSocketWrapper, Status } from "mobtimer-api";
import { MobTimerResponses } from "mobtimer-api";
import { MobSocketClient } from "mobtimer-api";
import { MobTimer } from "mobtimer-api";

export class Controller {
  static updateSummary() {
    // todo: Unhardcode refactor roles to be a class with a name and emoji in separate properties; also don't assume just 2 roles
    let participantsString =
      Controller.createListOfParticipantsWithRoleEmojisPrepended();
    document.title = `${Controller.statusSymbolText()}${
      Controller.secondsRemainingStringWithoutLeadingZero
    } ${participantsString} - ${Controller.getAppTitle()}`;
  }

  private static createListOfParticipantsWithRoleEmojisPrepended(): string {
    const participantsCount = Controller._participants.length;
    const rolesCount = Controller._roles.length;
    const minCount = Math.min(participantsCount, rolesCount);

    let participants = [] as string[];
    if (minCount > 0) {
      // build up a participant string with the role emoji prefix
      for (let i = 0; i < minCount; i++) {
        const rolePrefix = this.extractFirstEmoji(Controller._roles[i]);
        const participant = Controller._participants[i];
        const combo = `${rolePrefix}${participant}`;
        participants.push(combo);
      }
      // if there are more participants than roles, add the remaining participants without a role prefix
      if (participantsCount > rolesCount) {
        for (let i = rolesCount; i < participantsCount; i++) {
          const participant = Controller._participants[i];
          participants.push(participant);
        }
      }
    }
    return participants.join(",");
  }

  static extractFirstEmoji(str: string): string {
    // Regex is copied from: https://unicode.org/reports/tr51/
    const emojiRegex =
      /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}(\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?))*/gu;
    const match = str.match(emojiRegex);
    return match ? match[0] : "";
  }

  static get secondsRemainingStringWithoutLeadingZero() {
    const secondsRemainingString =
      Controller.frontendMobTimer.secondsRemainingString;
    return secondsRemainingString.startsWith("0")
      ? secondsRemainingString.substring(1)
      : secondsRemainingString;
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

  static frontendMobTimer: MobTimer = new MobTimer("temp-not-to-be-used");
  static client: MobSocketClient;

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
  ): void {
    this.setSecondsRemainingString = (timeString: string) => {
      setSecondsRemainingStringFunction(timeString);
      Controller.updateSummary();
    };
  }

  // inject participants
  static setParticipants = (_participants: string[]) => {}; // todo: consider alternatives to putting an underscore in the name; e.g., try abstract method/class, or interface
  static injectSetParticipants(
    setParticipantsFunction: (participants: string[]) => void
  ) {
    this.setParticipants = setParticipantsFunction;
    Controller.updateSummary();
  }

  // inject roles
  static setRoles = (_roles: string[]) => {}; // todo: consider alternatives to putting an underscore in the name; e.g., try abstract method/class, or interface
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
    return {
      mobStatus,
      durationMinutes,
      participants,
      roles,
      secondsRemaining,
    };
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
