import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';


import './App.css';

const App = () => {
  const [mobName, setMobName] = useState('');

  const submitJoinMobRequest = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Do something 
    alert(mobName);
  }

  return (
    <div>
      <JoinMobHeading />
      <JoinMobForm mobName={mobName} setMobName={setMobName} submitJoinMobRequest={submitJoinMobRequest} />
    </div>
  );
};

export default App;