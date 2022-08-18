import React, { useState } from 'react';
import JoinMob from './components/JoinMob';
import JoinMobHeading from './components/JoinMobHeading';


import './App.css';

const App = () => {
  const [mobName, setMobName] = useState('');

  const joinMob = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Do something 
    alert(mobName);
  }

  return (
    <div>
      <JoinMobHeading />
      <JoinMob mobName={mobName} setMobName={setMobName} joinMob={joinMob} />
    </div>
  );
};

export default App;