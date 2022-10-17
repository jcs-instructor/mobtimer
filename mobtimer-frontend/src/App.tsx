import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from './mobSocketClient';

import './App.css';
import { waitForSocketState } from './testUtils';

const App = () => {
  const [mobName, setMobName] = useState('');

  const submitJoinMobRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Join mob
    alert(mobName);
    const port = 4000;
    const client = new MobSocketClient(`ws://localhost:${port}`);
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