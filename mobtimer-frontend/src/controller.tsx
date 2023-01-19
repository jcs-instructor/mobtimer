import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';
import { MobSocketClient } from 'mobtimer-api';
import { MobTimer } from 'mobtimer-api';

export class Controller {

  static setDurationMinutes = (durationMinutes: number) => { };
  static injectSetDurationMinutes(setDurationMinutesFunction: (durationMinutes: number) => void) {
    this.setDurationMinutes = setDurationMinutesFunction;
  }

  static setTimeString = (timeString: string) => { };
  static injectSetTimeString(setTimeStringFunction: (timeString: string) => void) {
    this.setTimeString = setTimeStringFunction;
  }
}

// todo: move all below into Controller class above
export function getActionButtonLabel(status: Status) {
  switch (status) {
    case Status.Running: { return "⏸️ Pause"; }
    case Status.Paused: { return "▶️ Resume"; }
    case Status.Ready: { return "▶️ Start"; }
    default: { return ""; } // todo: maybe handle invalid status differently
  };
}

export function getStatus(response: MobTimerResponses.SuccessfulResponse) {
  return response.mobState.status;
}

export function getDurationMinutes(response: MobTimerResponses.SuccessfulResponse) {
  return response.mobState.durationMinutes;
}

export function getSecondsRemaining(response: MobTimerResponses.SuccessfulResponse) {
  return response.mobState.secondsRemaining;
}

export function toggle(client: MobSocketClient, frontendMobtimer: MobTimer) {
  switch (frontendMobtimer.status) {
    case Status.Running: { client.pause(); frontendMobtimer.pause(); break; }
    case Status.Paused: { client.start(); frontendMobtimer.start(); break; }
    case Status.Ready: { client.start(); frontendMobtimer.start(); break; }
  }
}

export function changeStatus(frontendMobtimer: MobTimer, status: Status) {
  if (frontendMobtimer.status !== status) {
    switch (status) {
      case Status.Running: { frontendMobtimer.start(); break; }
      case Status.Paused: { frontendMobtimer.pause(); break; }
      case Status.Ready: { frontendMobtimer.pause(); break; }
    }
  }
}

export function update(client: MobSocketClient, durationMinutes: number) {
  client.update(durationMinutes);
}
