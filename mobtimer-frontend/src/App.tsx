import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from 'mobtimer-api';
import { waitForSocketState } from 'mobtimer-api';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ActionButton from './components/ActionButton';

const App = () => {
  const [mobName, setMobName] = useState('');
  let client: MobSocketClient;

  const submitJoinMobRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Join mob
    // todo: unhardcode port
    const port = 4000;
    const socket = new W3CWebSocket(`ws://localhost:${port}`);
    client = new MobSocketClient(socket);
    client.webSocket.onmessage = (message) => {
      // todo: replace logging with actual changes in UI
      console.log(message);
    };
    await waitForSocketState(client.webSocket, WebSocket.OPEN);
    client.joinMob(mobName);
  }

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    client.start();
  }


  return (
    <div>
      <JoinMobHeading />
      <JoinMobForm mobName={mobName} setMobName={setMobName} submitJoinMobRequest={submitJoinMobRequest} />
      <ActionButton submitAction={submitAction} />
    </div>
  );
};

export default App;