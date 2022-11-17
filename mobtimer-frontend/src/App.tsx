import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from 'mobtimer-api';
import { waitForSocketState } from 'mobtimer-api';
import './App.css';
import ActionButton from './components/ActionButton';
import { createController } from './createController';

const App = () => {
  let client: MobSocketClient;
  const nextAction = () => { };
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


