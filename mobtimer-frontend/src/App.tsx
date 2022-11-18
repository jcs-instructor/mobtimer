import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from 'mobtimer-api';
import { waitForSocketState } from 'mobtimer-api';
import './App.css';
import ActionButton from './components/ActionButton';
// import { createController } from './createController';
import { MobTimerResponses } from 'mobtimer-api';
import { Status } from 'mobtimer-api';
// todo: unhardcode port
const port = 4000;
const url = `ws://localhost:${port}`;
const client = MobSocketClient.openSocketSync(url);
const actions = {
  [Status.Running]: { label: 'Pause', function: () => client.pause() },
  [Status.Paused]: { label: 'Resume', function: () => client.resume() },
  [Status.Ready]: { label: 'Start', function: () => client.start() },
}

const App = () => {
  const [mobName, setMobName] = useState('');
  const [label, setLabel] = useState('Start');
  const [status, setStatus] = useState(Status.Ready);
  // const [client, setClient] = useState({} as MobSocketClient);


  const submitJoinMobRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Join mob
    console.log('joined', client);
    client.webSocket.onmessage = (message) => {
      // createController(message, setLabel, nextAction, client);
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
      console.log('status', response.mobState.status, response);
      setLabel(actions[response.mobState.status].label);
      setStatus(response.mobState.status);
    };
    await waitForSocketState(client.webSocket, WebSocket.OPEN);
    client.joinMob(mobName);
  }

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    console.log('submitAction', client);
    actions[status].function();
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


