import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';
import { MobSocketClient } from 'mobtimer-api';
import { Action, MobTimer } from 'mobtimer-api';

export class Controller {

  // injections -----------------------

  // inject duration minutes
  static setDurationMinutes = (durationMinutes: number) => { };
  static injectSetDurationMinutes(setDurationMinutesFunction: (durationMinutes: number) => void) {
    this.setDurationMinutes = setDurationMinutesFunction;
  }

  // inject time string
  static setTimeString = (timeString: string) => { };
  static injectSetTimeString(setTimeStringFunction: (timeString: string) => void) {
    this.setTimeString = setTimeStringFunction;
  }

  // inject participants
  static setParticipants = (participants: string[]) => { };
  static injectSetParticipants(setParticipantsFunction: (participants: string[]) => void) {
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
      case Status.Running: { return "⏸️ Pause"; }
      case Status.Paused: { return "▶️ Resume"; }
      case Status.Ready: { return "▶️ Start"; }
      default: { return ""; } // todo: maybe handle invalid status differently
    };
  }

  static toggle(client: MobSocketClient, frontendMobtimer: MobTimer) {
    switch (frontendMobtimer.status) {
      case Status.Running: { client.pause(); frontendMobtimer.pause(); break; }
      case Status.Paused: { client.start(); frontendMobtimer.start(); break; }
      case Status.Ready: { client.start(); frontendMobtimer.start(); break; }
    }
  }

  static changeStatus(frontendMobtimer: MobTimer, backendStatus: Status, action: Action) {
    if (frontendMobtimer.status !== backendStatus) {
      switch (backendStatus) {
        case Status.Running: { frontendMobtimer.start(); break; }
        case Status.Paused: { frontendMobtimer.pause(); break; }
        case Status.Ready: { frontendMobtimer.reset(); break; }
      }
    }
  }

  // static update(client: MobSocketClient, durationMinutes: number) {
  //   client.update(durationMinutes);
  // }

  //   static addParticipant(client: MobSocketClient, name: string): void {
  //     client.addParticipant(name);
  // }

}

