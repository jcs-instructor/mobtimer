import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { MobSocketClient } from 'mobtimer-api';
import { waitForSocketState } from 'mobtimer-api';
import './App.css';
import ActionButton from './components/ActionButton';
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

  // element={<Component/>}
  return (
    <>
      <BrowserRouter>
        {MainRoutes()}
      </BrowserRouter>
    </>
  );

};

export default App;

function MainRoutes() {
  const [mobName, setMobName] = useState('');
  const [label, setLabel] = useState('');
  const [status, setStatus] = useState(Status.Ready);

  const submitJoinMobRequest = async () => {
    client.webSocket.onmessage = (message: { data: string; }) => {
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
      // todo: handle if response is not successful
      console.log('status', response.mobState.status, response.mobState.secondsRemaining, response);
      const status = Controller.getStatus(response);
      setStatus(status);
      const label = Controller.getActionButtonLabel(status);
      setLabel(label);
    };

    await waitForSocketState(client.webSocket, WebSocket.OPEN);
    client.joinMob(mobName);
    console.log('joined mob', mobName, client);

    // navigate('/home');
  }

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    console.log('submitAction', client);
    Controller.toggle(client, status);
  }

  return <Routes>
    <Route path="/" element={<JoinMobForm mobName={mobName} setMobName={setMobName} submitJoinMobRequest={submitJoinMobRequest} />} />
    <Route path="/:mobName" element={<ActionButton label={label} submitAction={submitAction} />} />
  </Routes>;
}

