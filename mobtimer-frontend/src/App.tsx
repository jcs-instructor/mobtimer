import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Room from "./components/Room";
import {
  Action,
  Command,
  IWebSocketWrapper,
  MobSocketClient,
  MobTimer,
  MobTimerResponses,
  TimeUtils,
  W3CWebSocketWrapper,
} from "mobtimer-api";
import { Controller } from "mobtimer-api";
import Launch from "./components/Launch";
// import logo from './logo.svg';
import { soundSource } from "./assets/soundSource";

const useLocalHost = window.location.href.includes("localhost");
const url = Controller.getUrl(useLocalHost);
console.log("App.tsx: url = " + url);
console.log("process.env", process.env);
console.log("url", url);
console.log("App.tsx redeployed 3 on", new Date());

function playAudio() {
  console.log("timer expired on front end");
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

function setSocketListener(
  client: MobSocketClient,
  setDurationMinutes: React.Dispatch<React.SetStateAction<number>>,
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>,
  setRoles: React.Dispatch<React.SetStateAction<string[]>>,
  setSecondsRemainingString: React.Dispatch<React.SetStateAction<string>>,
  setActionButtonLabel: React.Dispatch<React.SetStateAction<string>>
) {
  if (!client.webSocket) {
    throw new Error("WebSocket is undefined");
  }

  client.webSocket.onmessageReceived = (message: { data: any }) => {
    // Get response from server
    const response = JSON.parse(
      message.data
    ) as MobTimerResponses.SuccessfulResponse;

    // todo: handle if response is not successful
    consoleLogResponse(response);

    // Read response data
    const {
      mobStatus,
      durationMinutes,
      participants,
      roles,
      secondsRemaining,
    } = Controller.translateResponseData(response);

    if (
      response.actionInfo.action === Action.Expired ||
      response.actionInfo.action === Action.Reset
    ) {
      playAudio();
    }

    // modify frontend mob timer
    Controller.changeFrontendStatus(Controller.frontendMobTimer, mobStatus);
    Controller.frontendMobTimer.setSecondsRemaining(secondsRemaining);
    Controller.frontendMobTimer.durationMinutes = durationMinutes;
    Controller.frontendMobTimer.editParticipants(participants);
    Controller.frontendMobTimer.editRoles(roles);

    // Derive mob label from response status
    const label = getActionButtonLabel();

    // update React state variables
    setDurationMinutes(durationMinutes);
    setParticipants(participants);
    setRoles(roles);
    setSecondsRemainingString(
      Controller.frontendMobTimer.secondsRemainingString
    );
    setActionButtonLabel(label);

    // Update browser tab title text
    Controller.updateSummary();

    if (response.mobState.status !== Controller.frontendMobTimer.status) {
      console.log(
        "PROBLEM - FRONT AND BACK END STATUS MISMATCH!!!!!!!!!! --- " +
        "Frontend Status: " +
        Controller.frontendMobTimer.status +
        ", " +
        "Backend Status:" +
        response.mobState.status
      );
    }
  };
}

function consoleLogResponse(response: MobTimerResponses.SuccessfulResponse) {
  console.log(
    "Mob: " +
    response.mobState.mobName +
    " (" +
    response.mobState.participants.length +
    " Participant(s):" +
    response.mobState.participants.join(",") +
    "), " +
    "Action:" +
    response.actionInfo.action +
    ", " +
    "Status:" +
    response.mobState.status +
    ", DurationMin:" +
    response.mobState.durationMinutes +
    ", " +
    "RemainingSec:" +
    response.mobState.secondsRemaining +
    " (" +
    TimeUtils.getTimeString(response.mobState.secondsRemaining) +
    ") "
  );
}

const App = () => {
  // State variables - todo: consider grouping two or more of these into a single object, e.g., see the "Group Related State" section of https://blog.bitsrc.io/5-best-practices-for-handling-state-structure-in-react-f011e842076e
  const [mobName, setMobName] = useState("");
  const [secondsRemainingString, setSecondsRemainingString] = useState("");
  const [actionButtonLabel, setActionButtonLabel] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [participants, setParticipants] = useState([] as string[]);
  const [roles, setRoles] = useState([] as string[]);
  const [retries, setRetries] = useState(0);
  const [connected, setConnected] = useState(false);

  // Injections
  Controller.injectSetDurationMinutes(setDurationMinutes);
  Controller.injectSetParticipants(setParticipants);
  Controller.injectSetRoles(setRoles);
  Controller.injectSetSecondsRemainingString(setSecondsRemainingString);
  let client: MobSocketClient;
  client = Controller.client;

  useEffect(() => {
    if (Controller.client && Controller.client.webSocket?.socketState === Controller.client.webSocket?.OPEN_CODE) {
      return;
    }
    console.log("Creating websocket");
    let wrapperSocket = new W3CWebSocketWrapper(url) as IWebSocketWrapper;
    console.log("Created");
    console.log("Creating MobSocket");
    // todo: test if connected and retry if not
    const timeout = setTimeout( () => {
        if ( retries > 360) {
          console.log("Stopping");
        } else if ( wrapperSocket.socketState !== wrapperSocket.OPEN_CODE) {
          console.log("Connecting", new Date());
          wrapperSocket = new W3CWebSocketWrapper(url) as IWebSocketWrapper;
          setRetries(retries+1);
        } else {
          console.log("Connected");
          setConnected(true);
          clearTimeout(timeout);
        }
    }, 1000 )
    Controller.client = new MobSocketClient(wrapperSocket);
    const w = Controller.client.webSocket as any;
    console.log("MobSocket timeCreated", w.timeCreated);
    // setTimeCreated(new Date());
    setSocketListener(
      Controller.client,
      setDurationMinutes,
      setParticipants,
      setRoles,
      setSecondsRemainingString,
      setActionButtonLabel
    );
      
  }, [connected, retries])

  // Set socket listener


  // Submit join mob request
  const submitJoinMobRequest = async () => {
    const alreadyJoined = Controller.frontendMobTimer.state.mobName === mobName;
    console.log("button pressed", alreadyJoined, Controller.frontendMobTimer.state.mobName, "x", mobName);
    if (!mobName || alreadyJoined) {
      console.log("returning");
      return;
    }
    console.log("here");
    Controller.frontendMobTimer = new MobTimer(mobName);
    console.log("done");
    client.joinMob(mobName);
    console.log("joined mob", mobName, client);
  };

  // Submit action
  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Requred when using onSubmit to prevent the page from reloading page
    // which would completely bypass below code and bypass any html field validation
    event.preventDefault();
    Controller.toggleStatus(client, Controller.frontendMobTimer);
  };
  // Browser router
  return (
    <HashRouter>
      { !connected && retries > 6 && <h1>Trying to connect</h1>}
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
              submitAction={submitAction}
              submitJoinMobRequest={submitJoinMobRequest}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
