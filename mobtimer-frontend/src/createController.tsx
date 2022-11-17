import React from 'react';
import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';

export function createController(message: { data: string; }, setLabel: React.Dispatch<React.SetStateAction<string>>) {
  const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
  switch (response.mobState.status) {
    case Status.Running: {
      setLabel("Pause");
      break;
    }
    case Status.Paused: {
      setLabel("Resume");
      break;
    }
    case Status.Ready: {
      setLabel("Start");
    }
  };
}
