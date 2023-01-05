import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MobSocketClient } from 'mobtimer-api';
import './App.css';
import Room from './components/Room';
import { MobTimerResponses } from 'mobtimer-api';
import { Status } from 'mobtimer-api';
import * as Controller from './controller';
import JoinMobForm from './components/JoinMobForm';
import logo from './logo.svg';

// todo: unhardcode port
const port = 4000;
const url = `ws://localhost:${port}`;
const client = MobSocketClient.openSocketSync(url);

const App = () => {

  const [mobName, setMobName] = useState('');
  const [label, setLabel] = useState('');
  const [status, setStatus] = useState(Status.Ready);

  const submitJoinMobRequest = async () => {
    console.log('submitting join mob request', mobName);
    if (!mobName) {
      return;
    }
    console.log('okay');
    client.webSocket.onmessage = (message: { data: string; }) => {
      console.log('here we are');
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
      // todo: handle if response is not successful
      console.log('status', response.mobState.status, response.mobState.secondsRemaining, response);
      const status = Controller.getStatus(response);
      setStatus(status);
      const label = Controller.getActionButtonLabel(status);
      setLabel(label);
    };

    await client.waitForSocketState(WebSocket.OPEN);
    console.log('socket is open');
    client.joinMob(mobName);
    console.log('joined mob', mobName, 'x', client);
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
      <Route path="/:mobNameParam" element={<Room label={label} mobName={mobName} setMobName={setMobName} submitAction={submitAction} submitJoinMobRequest={submitJoinMobRequest} />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
