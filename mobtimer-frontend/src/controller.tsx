import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';

// functions to connect the model (business logic) and view (UI)

// const actions = {
//   [Status.Running]: { label: 'Pause', function: () => client.pause() },
//   [Status.Paused]: { label: 'Resume', function: () => client.resume() },
//   [Status.Ready]: { label: 'Start', function: () => client.start() },
// }

export function getActionButtonLabel(status: Status) {
  let label: string;
  switch (status) {
    case Status.Running: {
      label = "⏸️ Pause";
      break;
    }
    case Status.Paused: {
      label = "▶️ Resume";
      break;
    }
    case Status.Ready: {
      label = "▶️ Start";
      break;
    }
  };
  return label;
}

export function getStatus(response: MobTimerResponses.SuccessfulResponse) {
  return response.mobState.status;
}
