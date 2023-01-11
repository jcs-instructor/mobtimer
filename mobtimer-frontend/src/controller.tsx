import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';
import { MobSocketClient } from 'mobtimer-api';
import { MobTimer } from './mobTimer';

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

export function getSecondsRemaining(response: MobTimerResponses.SuccessfulResponse) {
  return response.mobState.secondsRemaining;
}


export function toggle(client: MobSocketClient, frontendMobtimer: MobTimer, status: Status) {
  switch (status) {
    case Status.Running: { client.pause(); frontendMobtimer.pause(); break; }
    case Status.Paused: { client.resume(); frontendMobtimer.resume(); break; }
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
