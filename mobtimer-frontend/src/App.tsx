import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from 'mobtimer-api';
import { waitForSocketState } from 'mobtimer-api';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket'; 

const App = () => {
  const [mobName, setMobName] = useState('');

  const submitJoinMobRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Join mob
    alert(mobName);
    const port = 4000;
    const socket = new W3CWebSocket(`ws://localhost:${port}`);
    const client = new MobSocketClient(socket);
    await waitForSocketState(client.webSocket, WebSocket.OPEN);
    client.joinMob("some-mob-name");
    // client.joinMob(mobName);
  }

  return (
    <div>
      <JoinMobHeading />
      <JoinMobForm mobName={mobName} setMobName={setMobName} submitJoinMobRequest={submitJoinMobRequest} />
    </div>
  );
};

export default App;