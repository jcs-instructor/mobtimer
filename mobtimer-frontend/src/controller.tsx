import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';
import { MobSocketClient } from 'mobtimer-api';
import { Action, MobTimer } from 'mobtimer-api';

export class Controller {

  // injections
  static setDurationMinutes = (durationMinutes: number) => { };
  static injectSetDurationMinutes(setDurationMinutesFunction: (durationMinutes: number) => void) {
    this.setDurationMinutes = setDurationMinutesFunction;
  }

  static setTimeString = (timeString: string) => { };
  static injectSetTimeString(setTimeStringFunction: (timeString: string) => void) {
    this.setTimeString = setTimeStringFunction;
  }

  // other functions
  static getActionButtonLabel(status: Status) {
    switch (status) {
      case Status.Running: { return "⏸️ Pause"; }
      case Status.Paused: { return "▶️ Resume"; }
      case Status.Ready: { return "▶️ Start"; }
      default: { return ""; } // todo: maybe handle invalid status differently
    };
  }

  static getStatus(response: MobTimerResponses.SuccessfulResponse) {
    return response.mobState.status;
  }

  static getAction(response: MobTimerResponses.SuccessfulResponse) {
    return response.actionInfo.action;
  }


  static getDurationMinutes(response: MobTimerResponses.SuccessfulResponse) {
    return response.mobState.durationMinutes;
  }

  static getSecondsRemaining(response: MobTimerResponses.SuccessfulResponse) {
    return response.mobState.secondsRemaining;
  }

  static toggle(client: MobSocketClient, frontendMobtimer: MobTimer) {
    switch (frontendMobtimer.status) {
      case Status.Running: { client.pause(); frontendMobtimer.pause(); break; }
      case Status.Paused: { client.start(); frontendMobtimer.start(); break; }
      case Status.Ready: { client.start(); frontendMobtimer.start(); break; }
    }
  }

  static changeStatus(frontendMobtimer: MobTimer, status: Status, action: Action) {
    if (frontendMobtimer.status !== status && action !== Action.Expired) {
      switch (status) {
        case Status.Running: { frontendMobtimer.start(); break; }
        case Status.Paused: { frontendMobtimer.pause(); break; }
        case Status.Ready: { frontendMobtimer.pause(); break; }
      }
    }
  }

  static update(client: MobSocketClient, durationMinutes: number) {
    client.update(durationMinutes);
  }
}

