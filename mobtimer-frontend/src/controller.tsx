import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';
import { MobSocketClient } from 'mobtimer-api';

// functions to connect the model (business logic) and view (UI)

// const actions = {
//   [Status.Running]: { label: 'Pause', function: () => client.pause() },
//   [Status.Paused]: { label: 'Resume', function: () => client.resume() },
//   [Status.Ready]: { label: 'Start', function: () => client.start() },
// }

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
  const actions = {
    [Status.Running]: { function: () => client.pause() },
    [Status.Paused]: { function: () => client.resume() },
    [Status.Ready]: { function: () => client.start() },
  }
  actions[status].function();
}


