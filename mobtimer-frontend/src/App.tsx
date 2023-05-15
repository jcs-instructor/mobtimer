import React, { useState } from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Room from './components/Room';
import { Action, IWebSocketWrapper, MobSocketClient, MobTimer, MobTimerResponses, TimeUtils, W3CWebSocketWrapper } from 'mobtimer-api';
import { Controller } from './controller/controller';
import Launch from './components/Launch';
// import logo from './logo.svg';
import { soundSource } from "./assets/soundSource";

// todo: unhardcode port
const url =
  process.env.REACT_APP_WEBSOCKET_URL ||
  `ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || "4000"}`;
console.log("process.env", process.env);
console.log("url", url);

const wrapperSocket = new W3CWebSocketWrapper(url) as IWebSocketWrapper;
Controller.client = new MobSocketClient(wrapperSocket);
const mobName = "front-end-timer";
Controller.frontendMobTimer = new MobTimer(mobName);
const client = Controller.client;
client.joinMob(mobName);

function playAudio() {
  console.log("timer expired on front end");
  const audio = new Audio(soundSource);
  audio.play();
}

const App = () => {

  // State variables - todo: consider grouping two or more of these into a single object, e.g., see the "Group Related State" section of https://blog.bitsrc.io/5-best-practices-for-handling-state-structure-in-react-f011e842076e
  const [mobName, setMobName] = useState('');
  const [secondsRemainingString, setSecondsRemainingString] = useState('');
  const [actionButtonLabel, setActionButtonLabel] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [participants, setParticipants] = useState([] as string[]);
  const [roles, setRoles] = useState([] as string[]);

  // Injections
  Controller.injectSetDurationMinutes(setDurationMinutes);
  Controller.injectSetParticipants(setParticipants);
  Controller.injectSetRoles(setRoles);
  Controller.injectSetSecondsRemainingString(setSecondsRemainingString);

  // Submit join mob request
  const submitJoinMobRequest = async () => {

    const alreadyJoined = Controller.frontendMobTimer.state.mobName === mobName;
    if (!mobName || alreadyJoined) {
      return;
    };

    Controller.frontendMobTimer = new MobTimer(mobName);    

    client.webSocket.onmessageReceived = (message: { data: any }) => {

      // Get response from server
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;

      // todo: handle if response is not successful

      console.log("Mob: " + response.mobState.mobName +
        " (" + response.mobState.participants.length + " Participant(s):" + response.mobState.participants.join(",") + "), " +
        "Action:" + response.actionInfo.action + ", " +
        "Status:" + response.mobState.status + ", DurationMin:" + response.mobState.durationMinutes + ", " +
        "RemainingSec:" + response.mobState.secondsRemaining + " (" + TimeUtils.getTimeString(response.mobState.secondsRemaining) + ") "
      );

      // Read response data 
      const { mobStatus, durationMinutes, participants, roles, secondsRemaining } = Controller.translateResponseData(response);

      if (response.actionInfo.action === Action.Expired || response.actionInfo.action === Action.Reset) {
        playAudio();
      }

      // Derive mob label from response status
      const label = Controller.getActionButtonLabel(mobStatus); // todo: make enum 

      // modify frontend mob timer
      Controller.changeStatus(Controller.frontendMobTimer, mobStatus);
      Controller.frontendMobTimer.setSecondsRemaining(secondsRemaining);

      // update React state variables
      setDurationMinutes(durationMinutes);
      setParticipants(participants);
      setRoles(roles);
      setSecondsRemainingString(Controller.frontendMobTimer.secondsRemainingString);
      setActionButtonLabel(label);

      if (response.mobState.status !== Controller.frontendMobTimer.status) {
        console.log("PROBLEM - FRONT AND BACK END STATUS MISMATCH!!!!!!!!!! --- " +
          "Frontend Status: " + Controller.frontendMobTimer.status + ", " +
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
    Controller.toggle(client, Controller.frontendMobTimer);
  }

  // Browser router
  return <HashRouter>
    <Routes>
      <Route path="/" element={<Launch />} />
      <Route path="/:mobNameUrlParam"
        element={<Room
          durationMinutes={durationMinutes}
          participants={participants}
          roles={roles}
          actionButtonLabel={actionButtonLabel}
          setMobName={setMobName}
          timeString={secondsRemainingString}
          submitAction={submitAction}
          submitJoinMobRequest={submitJoinMobRequest} />} />
    </Routes>

  </HashRouter >;
}

export default App;
