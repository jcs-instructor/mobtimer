import React from 'react';
import { Status } from 'mobtimer-api';
import { MobTimerResponses } from 'mobtimer-api';

export function createController(message: { data: string; }, setLabel: React.Dispatch<React.SetStateAction<string>>, submitAction: any, client: any) {
  const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
  switch (response.mobState.status) {
    case Status.Running: {
      setLabel("Pause");
      submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        client.pause();
      }
      break;
    }
    case Status.Paused: {
      setLabel("Resume");
      submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        client.resume();
      }
      break;
    }
    case Status.Ready: {
      setLabel("Start");
      submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        client.resume();
      }
    }
  };
}
