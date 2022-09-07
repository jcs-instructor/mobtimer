import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';


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
    //const client = await openSocket();
    await client.joinMob(mobName);
  }

  const joinMob = (mobName: string) => {
    const request = joinRequest(mobName);
    this.send(request);
  }

  return (
    <div>
      <JoinMobHeading />
      <JoinMobForm mobName={mobName} setMobName={setMobName} submitJoinMobRequest={submitJoinMobRequest} />
    </div>
  );
};

export default App;