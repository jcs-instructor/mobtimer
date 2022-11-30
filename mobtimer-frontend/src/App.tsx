import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from 'mobtimer-api';
import { waitForSocketState } from 'mobtimer-api';
import './App.css';
import ActionButton from './components/ActionButton';
import { MobTimerResponses } from 'mobtimer-api';
import { Status } from 'mobtimer-api';
import * as Controller from './controller';

// todo: unhardcode port
const port = 4000;
const url = `ws://localhost:${port}`;
const client = MobSocketClient.openSocketSync(url);

const App = () => {
  const [mobName, setMobName] = useState('');
  const [label, setLabel] = useState('');
  const [status, setStatus] = useState(Status.Ready);

  const submitJoinMobRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    client.webSocket.onmessage = (message) => {
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
      // todo: handle if response is not successful
      console.log('status', response.mobState.status, response.mobState.secondsRemaining, response);
      const status = Controller.getStatus(response);
      setStatus(status);
      const label = Controller.getActionButtonLabel(status);
      setLabel(label);
    };

    await waitForSocketState(client.webSocket, WebSocket.OPEN);
    client.joinMob(mobName);
    console.log('joined mob', mobName, client);
  }

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    console.log('submitAction', client);
    Controller.toggle(client, status);
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

