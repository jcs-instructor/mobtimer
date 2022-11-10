import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from 'mobtimer-api';
import { waitForSocketState } from 'mobtimer-api';
import './App.css';
// todo: here and elsewhere - do ... as W3CWebSocket 
import { w3cwebsocket } from 'websocket'; 

const App = () => {
  const [mobName, setMobName] = useState('');

  const submitJoinMobRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Join mob
    alert(mobName);
    const port = 4000;
    const socket = new w3cwebsocket(`ws://localhost:${port}`);
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