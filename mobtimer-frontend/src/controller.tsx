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


export function toggle(client: MobSocketClient, mobTimer: MobTimer, status: Status) {
  switch (status) {
    case Status.Running: { client.pause(); mobTimer.pause(); break; }
    case Status.Paused: { client.resume(); mobTimer.resume(); break; }
    case Status.Ready: { client.start(); mobTimer.start(); break; }
  }
}
