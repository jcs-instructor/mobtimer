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
  StringUtils,
} from "./mobtimer-api/src";
import Launch from "./components/Launch";
// import logo from './logo.svg';
import { soundSource } from "./assets/soundSource";
import AlertBox from "./components/Alert";

let controller = Controller.staticController;
controller = new Controller();
const useLocalHost = window.location.href.includes("localhost");
const url = controller.getUrl(useLocalHost);
const RETRY_SECONDS = Number.parseInt(process.env.RETRY_SECONDS || "") || 0.1;
const RETRY_MILLISECONDS = TimeUtils.secondsToMilliseconds(RETRY_SECONDS);
console.log(RETRY_MILLISECONDS);
console.info("App.tsx: url = " + url);
console.info("process.env", process.env);
console.info("url", url);
console.info("App.tsx redeployed 3 on", new Date());
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

  let client: Client;
  client = controller.client as Client;


  const initialize = (retry = false) => {
    console.info("INITIALIZE CALLED", retry, Controller.staticController ? "static controller exists" : "static controller null");

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
    console.log("INSIDE USEEFFECT", renderCompleted, controller?.frontendMobTimer?.state?.mobName,
    Controller.staticController ? "static controller exists" : "static controller null");
    // initialize function
    // useEffect code
    setRenderCompleted(true);
  }, [renderCompleted]);
  if (renderCompleted && !socketClosed) {
    if (wrapperSocket.socketState === wrapperSocket.OPEN_CODE) {
      initialize();
    } else {
      console.log("DEFINING INTERVAL")
      interval = setInterval(
        () => {
          console.log("INSIDE INTERVAL")
          if (wrapperSocket.socketState === wrapperSocket.CLOSED_CODE) {
            setSocketClosed(true);
            console.log("App.tsx: closed setInterval: wrapperSocket.socketState", wrapperSocket.socketState);
            wrapperSocket = new W3CClientSocket(url) as IClientSocket;
          } else if (wrapperSocket.socketState === wrapperSocket.OPEN_CODE) {
            console.log("App.tsx: connected setInterval: wrapperSocket.socketState", wrapperSocket.socketState);
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
    console.log("SUBMIT JOIN MOB REQUEST 2", mobName, 'x', controller.frontendMobTimer.state.mobName, 
      Controller.staticController ? "static controller exists" : "static controller null",
    controller.client ? "client controller exists" : "client controller null")
    const alreadyJoined = controller.frontendMobTimer.state.mobName === mobName;
    if (!mobName || alreadyJoined || !controller.client) {
      console.log("submitJoinMobRequest no submit: mobName", mobName, "alreadyJoined", alreadyJoined, "controller.client", controller.client ? "exists" : "null");  
      return;
    }
    console.log("submitJoinMobRequest joining")
    controller.frontendMobTimer = new MobTimer(mobName);
    controller.client.joinMob(mobName);
  };

  const addParticipantName = (participantName: string) => {
    console.log("onSubmit AddParticipant", participantName, Controller.staticController?.client ? "client exists" : "client null");
    const trimmedName = participantName.trim();
    if (trimmedName.length > 0) { // todo also check for duplicates, i.e.,  && !participants.includes(trimmedName))
      controller.client?.addParticipant(trimmedName);
    }            
  }
  
  const submitEditParticipantsRequest = (
    { participantNames, roleNames }: { participantNames: string, roleNames: string}    
  ) => {
    console.log("SUBMIT EDIT PARTICIPANTS REQUEST", participantNames, roleNames);
    controller.client?.editParticipants(StringUtils.splitAndTrim(participantNames));
    controller.client?.editRoles(StringUtils.splitAndTrim(roleNames))
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
              submitEditParticipants={submitEditParticipantsRequest}
              addParticipantName={addParticipantName}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
