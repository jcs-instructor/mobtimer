import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from 'mobtimer-api';
import { waitForSocketState } from 'mobtimer-api';
import './App.css';
import ActionButton from './components/ActionButton';
import { createController } from './createController';
import { MobTimerResponses } from 'mobtimer-api';
import { Status } from 'mobtimer-api';

const App = () => {
  let client: MobSocketClient;
  let nextAction = () => { };
  const [mobName, setMobName] = useState('');
  const [label, setLabel] = useState('Start');
  // todo: unhardcode port
  const port = 4000;
  const url = `ws://localhost:${port}`;

  const submitJoinMobRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Join mob
    client = await MobSocketClient.openSocket(url);
    client.webSocket.onmessage = (message) => {
      createController(message, setLabel, nextAction, client);
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
      switch (response.mobState.status) {
        case Status.Running: {
          setLabel("Pause");
          nextAction = () => client.pause;
          break;
        }
        case Status.Paused: {
          setLabel("Resume");
          nextAction = () => client.resume;
          break;
        }
        case Status.Ready: {
          setLabel("Start");
          nextAction = () => client.start();
        }
      };

    };
    await waitForSocketState(client.webSocket, WebSocket.OPEN);
    client.joinMob(mobName);
  }

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    nextAction();
    //const x: () => void = client.resume;
  }


  return (
    <div>
      <JoinMobHeading />
      <JoinMobForm mobName={mobName} setMobName={setMobName} submitJoinMobRequest={submitJoinMobRequest} />
      <ActionButton label={label} submitAction={submitAction} />
    </div>
  );
};

export default App;


