import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Room from "./components/Room";
import {
  Command,
  IFrontendSocket,
  FrontendMobSocket,
  MobTimer,
  TimeUtils,
  W3CFrontendSocket,
} from "mobtimer-api";
import { Controller, setSocketListener } from "mobtimer-api";
import Launch from "./components/Launch";
// import logo from './logo.svg';
import { soundSource } from "./assets/soundSource";
import AlertBox from "./components/Alert";

const useLocalHost = window.location.href.includes("localhost");
const url = Controller.getUrl(useLocalHost);
const RETRY_SECONDS = Number.parseInt(process.env.RETRY_SECONDS || '') || 2;
const RETRY_MILLISECONDS = TimeUtils.secondsToMilliseconds(RETRY_SECONDS);
console.info("App.tsx: url = " + url);
console.info("process.env", process.env);
console.info("url", url);
console.info("App.tsx redeployed 3 on", new Date());

function playAudio() {
  const audio = new Audio(soundSource);
  audio.play();
}

function getActionButtonLabel() {
  switch (Controller.frontendMobTimer.nextCommand) {
    case Command.Pause: {
      return "⏸️ Pause";
    }
    case Command.Resume: {
      return "▶️ Resume";
    }
    case Command.Start: {
      return "▶️ Start";
    }
    default: {
      return "";
    } // todo: maybe handle invalid status differently
  }
}

const App = () => {
  // State variables - todo: consider grouping two or more of these into a single object, e.g., see the "Group Related State" section of https://blog.bitsrc.io/5-best-practices-for-handling-state-structure-in-react-f011e842076e
  const [mobName, setMobName] = useState("");
  const [secondsRemainingString, setSecondsRemainingString] = useState("");
  const [actionButtonLabel, setActionButtonLabel] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [participants, setParticipants] = useState([] as string[]);
  const [roles, setRoles] = useState([] as string[]);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);


  // Injections
  Controller.injectSetDurationMinutes(setDurationMinutes);
  Controller.injectSetParticipants(setParticipants);
  Controller.injectSetRoles(setRoles);
  Controller.injectSetSecondsRemainingString(setSecondsRemainingString);
  let client: FrontendMobSocket;
  client = Controller.client;

  useEffect(() => {
    // initialize function
    const initialize = () => {
      if (wrapperSocket.socketState !== wrapperSocket.OPEN_CODE) {
        setConnecting(true);
        setConnected(false);
        wrapperSocket = new W3CFrontendSocket(url) as IFrontendSocket;
      } else {
        console.info("Connected");
        setConnected(true);
        setConnecting(false);
        clearInterval(interval);
      }
      Controller.client = new FrontendMobSocket(wrapperSocket);
      // setTimeCreated(new Date());
      setSocketListener(
        Controller.client,
        setDurationMinutes,
        setParticipants,
        setRoles,
        setSecondsRemainingString,
        setActionButtonLabel,
        playAudio,
        getActionButtonLabel
      );
   };

    // useEffect code
    if (connected) {
      return;
    }
    let wrapperSocket = new W3CFrontendSocket(url) as IFrontendSocket;
    if (!connecting) {
      initialize();
    }
    const interval = setInterval(initialize, RETRY_MILLISECONDS);
    // required syntax for setInterval inside useEffect
    // see https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
    // Many articles say the same thing
    return () => clearInterval(interval);

  }, [connecting, connected])

  // Set socket listener


  // Submit join mob request
  const submitJoinMobRequest = async () => {
    const alreadyJoined = Controller.frontendMobTimer.state.mobName === mobName;
    if (!mobName || alreadyJoined) {
      return;
    }
    Controller.frontendMobTimer = new MobTimer(mobName);
    Controller.client.joinMob(mobName);
  };

  // Submit action
  const submitToggleAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Requred when using onSubmit to prevent the page from reloading page
    // which would completely bypass below code and bypass any html field validation
    event.preventDefault();
    Controller.toggleStatus(client, Controller.frontendMobTimer);
  };
  // Browser router
  return (
    <HashRouter>
      {!connected && <AlertBox message="Connecting......" />}
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route
          path="/:mobNameUrlParam"
          element={
            <Room
              durationMinutes={durationMinutes}
              participants={participants}
              roles={roles}
              actionButtonLabel={actionButtonLabel}
              setMobName={setMobName}
              timeString={secondsRemainingString}
              submitToggleAction={submitToggleAction}
              submitJoinMobRequest={submitJoinMobRequest}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
