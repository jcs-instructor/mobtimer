import React, { useState } from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Room from './components/Room';
import { MobTimerResponses, TimeUtils } from 'mobtimer-api';
import { Controller } from './controller';
import Launch from './components/Launch';
import { client, frontendMobTimer } from './timers';
// import logo from './logo.svg';

const App = () => {

  // State variables - todo: consider grouping two or more of these into a single object, e.g., see the "Group Related State" section of https://blog.bitsrc.io/5-best-practices-for-handling-state-structure-in-react-f011e842076e
  const [mobName, setMobName] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [timeString, setTimeString] = useState(frontendMobTimer.secondsRemainingString);
  const [actionButtonLabel, setActionButtonLabel] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(frontendMobTimer.durationMinutes);
  const [participants, setParticipants] = useState(frontendMobTimer.participants);

  // Injections
  Controller.injectSetDurationMinutes(setDurationMinutes);
  Controller.injectSetParticipants(setParticipants);
  Controller.injectSetTimeString(setTimeString);

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

      console.log("Mob: " + response.mobState.mobName +
        " (" + response.mobState.participants.length + " Participant(s):" + response.mobState.participants.join(",") + "), " +
        "Action:" + response.actionInfo.action + ", " +
        "Status:" + response.mobState.status + ", DurationMin:" + response.mobState.durationMinutes + ", " +
        "RemainingSec:" + response.mobState.secondsRemaining + " (" + TimeUtils.getTimeString(response.mobState.secondsRemaining) + ") "
      );

      // Status
      const mobStatus = Controller.getStatus(response);
      //setStatus(status);

      // Duration minutes
      const durationMinutes = Controller.getDurationMinutes(response);
      setDurationMinutes(durationMinutes);

      // Participants
      const participants = Controller.getParticipants(response);
      setParticipants(participants);

      // Sync frontend timer
      const secondsRemaining = Controller.getSecondsRemaining(response);
      Controller.changeStatus(frontendMobTimer, mobStatus, Controller.getAction(response));
      frontendMobTimer.setSecondsRemaining(secondsRemaining);
      setTimeString(frontendMobTimer.secondsRemainingString);
      const label = Controller.getActionButtonLabel(mobStatus);
      setActionButtonLabel(label);

      if (response.mobState.status !== frontendMobTimer.status) {
        console.log("PROBLEM - FRONT AND BACK END STATUS MISMATCH!!!!!!!!!! --- " +
          "Frontend Status: " + frontendMobTimer.status + ", " +
          "Backend Status:" + response.mobState.status);
      };
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

  console.log('aaaa6');
  // Browser router
  return <HashRouter>
    <Routes>
      <Route path="/" element={<Launch />} />
      <Route path="/:mobNameUrlParam"
        element={<Room
          durationMinutes={durationMinutes}
          particpants={participants}
          actionButtonLabel={actionButtonLabel}
          setMobName={setMobName}
          timeString={timeString}
          submitAction={submitAction}
          submitJoinMobRequest={submitJoinMobRequest} />} />
    </Routes>

  </HashRouter >;
}

export default App;
