import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';
import { MobSocketClient } from 'mobtimer-api';

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

export function toggle(client: MobSocketClient, status: Status) {
  switch (status) {
    case Status.Running: { client.pause(); break; }
    case Status.Paused: { client.resume(); break; }
    case Status.Ready: { client.start(); break; }
  }
}


