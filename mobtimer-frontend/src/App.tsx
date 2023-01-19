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

  // State variables - todo: consider grouping two or more of these into a single object, e.g., see the "Group Related State" section of https://blog.bitsrc.io/5-best-practices-for-handling-state-structure-in-react-f011e842076e
  const [mobName, setMobName] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [timeString, setTimeString] = useState(frontendMobTimer.secondsRemainingString);
  const [actionButtonLabel, setActionButtonLabel] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(frontendMobTimer.durationMinutes);
  Controller.setDurationMinutes = setDurationMinutes;

  // Submit join mob request
  const submitJoinMobRequest = async () => {
    
    if (!mobName || loaded) {
      return;
    };
    
    setLoaded(true);

    client.webSocket.onmessage = (message: { data: string; }) => {
      
      // Get response from server
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
      
      // todo: handle if response is not successful
      console.log("Mob: "+response.mobState.mobName+", Action:"+response.actionInfo.action+", Status:"+response.mobState.status+", DurationMin:"+response.mobState.durationMinutes+", RemainingSec:"+response.mobState.secondsRemaining);
      
      // Status
      const mobStatus = Controller.getStatus(response);
      //setStatus(status);
      
      // Duration minutes
      const durationMinutes = Controller.getDurationMinutes(response);
      setDurationMinutes(durationMinutes);
      
      // Sync frontend timer
      const secondsRemaining = Controller.getSecondsRemaining(response);
      Controller.changeStatus(frontendMobTimer, mobStatus);
      frontendMobTimer.setSecondsRemaining(secondsRemaining);
      setTimeString(frontendMobTimer.secondsRemainingString);
      const label = Controller.getActionButtonLabel(mobStatus);
      setActionButtonLabel(label);
    };

    await client.waitForSocketState(WebSocket.OPEN);
    client.joinMob(mobName);
    console.log('joined mob', mobName, client);
  }

  // Submit action
  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Requred when using onSubmit to prevent the page from reloading page
    // which would completely bypass below code and bypass any html field validation
    event.preventDefault();
    Controller.toggle(client, frontendMobTimer);
  }

  // To do: May be unused - if so, remove
  const submitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    // Requred when using onSubmit to prevent the page from reloading page
    // which would completely bypass below code and bypass any html field validation
    event.preventDefault();
    Controller.update(client, durationMinutes);
  }

  // Browser router
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<JoinMobForm />} />
      <Route path="/:mobNameUrlParam" element={<Room durationMinutes={durationMinutes} setDurationMinutes={setDurationMinutes} actionButtonLabel={actionButtonLabel} setMobName={setMobName} timeString={timeString} setTimeString={setTimeString} submitAction={submitAction} submitJoinMobRequest={submitJoinMobRequest} />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
