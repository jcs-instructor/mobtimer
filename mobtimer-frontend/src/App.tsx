import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Room from "./components/Room";
import {
  Command,
  IClientSocket,
  Client,
  MobTimer,
  TimeUtils,
  W3CClientSocket,
  Controller,
  setSocketListener,
} from "./mobtimer-api/src";
import Launch from "./components/Launch";
// import logo from './logo.svg';
import { soundSource } from "./assets/soundSource";
import AlertBox from "./components/Alert";

const controller = Controller.staticController;
const useLocalHost = window.location.href.includes("localhost");
const url = controller.getUrl(useLocalHost);
const RETRY_SECONDS = Number.parseInt(process.env.RETRY_SECONDS || "") || 0.1;
const RETRY_MILLISECONDS = TimeUtils.secondsToMilliseconds(RETRY_SECONDS);
let wrapperSocket = new W3CClientSocket(url) as IClientSocket;

function playAudio() {
  const audio = new Audio(soundSource);
  audio.play();
}

function getActionButtonLabel() {
  switch (controller.frontendMobTimer.nextCommand) {
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
  const [socketClosed, setSocketClosed] = useState(false);
  // const [connecting, setConnecting] = useState(false);
  const [renderCompleted, setRenderCompleted] = useState(false);
  console.log("App.tsx: App() called", renderCompleted);
  let interval: NodeJS.Timeout | undefined = undefined;

  // Broadcast functions (send to server)
  const broadcastDurationMinutes = (durationMinutes: number) =>
    client?.update(durationMinutes);

  let client = controller.client as Client;

  const initialize = (_retry = false) => {
    controller.client = new Client(wrapperSocket);
    const stateSetters = {
      setRoles,
      setParticipants,
      setSecondsRemainingString,
      setDurationMinutes,
      setActionButtonLabel,
    };
    setSocketListener({
      stateSetters,
      controller,
      playAudio,
      getActionButtonLabel,
    });
  };

  useEffect(() => {
    // initialize function
    // useEffect code
    setRenderCompleted(true);
  }, [renderCompleted]);
  if (renderCompleted && !socketClosed) {
    if (wrapperSocket.socketState === wrapperSocket.OPEN_CODE) {
      initialize();
    } else {
      interval = setInterval(
        () => {
          if (wrapperSocket.socketState === wrapperSocket.CLOSED_CODE) {
            setSocketClosed(true);
            wrapperSocket = new W3CClientSocket(url) as IClientSocket;
          } else if (wrapperSocket.socketState === wrapperSocket.OPEN_CODE) {
            initialize(true);
            setSocketClosed(false);
            clearInterval(interval);
            interval = undefined;
          }
        },
        RETRY_MILLISECONDS);
    }

    // required syntax for setInterval inside useEffect
    // see https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
    // Many articles say the same thing
  }
  // Set socket listener

  // Submit join mob request
  const submitJoinMobRequest = async () => {
    const alreadyJoined = controller.frontendMobTimer.state.mobName === mobName;
    // todo: refactor: already joined is different from the other 2 which have to do with being fully initialized
    if (!mobName || alreadyJoined || !controller.client) {
      return;
    }
    controller.frontendMobTimer = new MobTimer(mobName);
    controller.client.joinMob(mobName);
  };

  // Submit action
  const submitToggleAction = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // Requred when using onSubmit to prevent the page from reloading page
    // which would completely bypass below code and bypass any html field validation
    event.preventDefault();
    controller.toggleStatus(client, controller.frontendMobTimer);
  };

  return (
    <BrowserRouter>
      {socketClosed && <AlertBox message="Connecting......" />}
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route
          path="/:mobNameUrlParam"
          element={
            <Room
              durationMinutes={durationMinutes}
              setDurationMinutes={setDurationMinutes}
              broadcastDurationMinutes={broadcastDurationMinutes}
              participants={participants}
              roles={roles}
              actionButtonLabel={actionButtonLabel}
              setMobName={setMobName}
              setSecondsRemainingString={setSecondsRemainingString}
              timeString={secondsRemainingString}
              submitToggleAction={submitToggleAction}
              submitJoinMobRequest={submitJoinMobRequest}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
