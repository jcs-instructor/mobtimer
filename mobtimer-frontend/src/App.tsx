import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from './mobtimer-backend/src/client/mobSocketClient';

import './App.css';

const App = () => {
  const [mobName, setMobName] = useState('');

  const submitJoinMobRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Join mob
    alert(mobName);
    const port = 9001;
    const client = new MobSocketClient(`ws://localhost:${port}`);
    client.joinMob(mobName);
  }

  return (
    <div>
      <JoinMobHeading />
      <JoinMobForm mobName={mobName} setMobName={setMobName} submitJoinMobRequest={submitJoinMobRequest} />
    </div>
  );
};

export default App;