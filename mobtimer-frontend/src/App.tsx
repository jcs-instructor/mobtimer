import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Room from './components/Room';
import { MobSocketTestClient, MobTimerResponses } from 'mobtimer-api';
import { Status } from 'mobtimer-api';
import * as Controller from './controller';
import JoinMobForm from './components/JoinMobForm';
import { client, frontendMobTimer } from './timers';
import logo from './logo.svg';

const App = () => {

  const [mobName, setMobName] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [label, setLabel] = useState('');
  const [status, setStatus] = useState(Status.Ready);
  const [durationMinutes, setDurationMinutes] = useState(frontendMobTimer.durationMinutes);

  const submitJoinMobRequest = async () => {
    if (!mobName || loaded) {
      return;
    };
    setLoaded(true);
    client.webSocket.onmessage = (message: { data: string; }) => {
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
      // todo: handle if response is not successful
      console.log("Mob: "+response.mobState.mobName+", Action:"+response.actionInfo.action+", Status:"+response.mobState.status+", RemainingSec:"+response.mobState.secondsRemaining+", DurationMin:"+response.mobState.durationMinutes);
      // console.log('onmessage status', response.mobState.status, response.mobState.secondsRemaining, response);
      const status = Controller.getStatus(response);
      // console.log('onmessage status 2', status);
      setStatus(status);
      const durationMinutes = Controller.getDurationMinutes(response);
      setDurationMinutes(durationMinutes);
      const secondsRemaining = Controller.getSecondsRemaining(response);
      Controller.changeStatus(frontendMobTimer, status);
      frontendMobTimer.setSecondsRemaining(secondsRemaining);
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
    Controller.toggle(client, frontendMobTimer, status);
  }

  const submitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    // Requred when using onSubmit to prevent the page from reloading page
    // which would completely bypass below code and bypass any html field validation
    event.preventDefault();
    Controller.update(client, durationMinutes);
  }


  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<JoinMobForm />} />
      <Route path="/:mobNameUrlParam" element={<Room label={label} setMobName={setMobName} submitAction={submitAction} submitJoinMobRequest={submitJoinMobRequest} />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
