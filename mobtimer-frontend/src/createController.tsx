import React from 'react';
import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';

export function createController(message: { data: string; }, setLabel: React.Dispatch<React.SetStateAction<string>>, setNextAction: any, client: any) {
  const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
  switch (response.mobState.status) {
    case Status.Running: {
      setLabel("Pause");
      setNextAction(client.pause);
      break;
    }
    case Status.Paused: {
      setLabel("Resume");
      setNextAction(client.resume);
      break;
    }
    case Status.Ready: {
      setLabel("Start");
      setNextAction(client.start);
    }
  };
}
