import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MobSocketClient } from 'mobtimer-api';
import './App.css';
import Room from './components/Room';
import { MobTimerResponses } from 'mobtimer-api';
import { Status } from 'mobtimer-api';
import * as Controller from './controller';
import JoinMobForm from './components/JoinMobForm';
import Timer from './components/Timer';
import logo from './logo.svg';

// todo: unhardcode port
const port = 4000;
const url = `ws://localhost:${port}`;
const client = MobSocketClient.openSocketSync(url);

const App = () => {

  const [mobName, setMobName] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [label, setLabel] = useState('');
  const [status, setStatus] = useState(Status.Ready);

  const submitJoinMobRequest = async () => {
    if (!mobName || loaded) {
      return;
    };
    setLoaded(true);
    client.webSocket.onmessage = (message: { data: string; }) => {
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
      // todo: handle if response is not successful
      console.log('status', response.mobState.status, response.mobState.secondsRemaining, response);
      const status = Controller.getStatus(response);
      setStatus(status);
      const label = Controller.getActionButtonLabel(status);
      setLabel(label);
    };

    await client.waitForSocketState(WebSocket.OPEN);
    client.joinMob(mobName);
    console.log('joined mob', mobName, client);
  }

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Requred when using onSubmit to prevent the page from reloading page
    // which would completely bypass below code and bypass any html field validation
    event.preventDefault();
    Controller.toggle(client, status);
  }

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<JoinMobForm />} />
      <Route path="/timer" element={<Timer />} />
      <Route path="/:mobNameUrlParam" element={<Room label={label} setMobName={setMobName} submitAction={submitAction} submitJoinMobRequest={submitJoinMobRequest} />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
