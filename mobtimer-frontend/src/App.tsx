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
      console.error(
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
  console.info(
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
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);


  // Injections
  Controller.injectSetDurationMinutes(setDurationMinutes);
  Controller.injectSetParticipants(setParticipants);
  Controller.injectSetRoles(setRoles);
  Controller.injectSetSecondsRemainingString(setSecondsRemainingString);
  let client: MobSocketClient;
  client = Controller.client;

  useEffect(() => {
    // initialize function
    const initialize = () => {
      if (wrapperSocket.socketState !== wrapperSocket.OPEN_CODE) {
        setConnecting(true);
        wrapperSocket = new W3CWebSocketWrapper(url) as IWebSocketWrapper;
      } else {
        console.info("Connected");
        setConnected(true);
        setConnecting(false);
        clearInterval(interval);
      }
      Controller.client = new MobSocketClient(wrapperSocket);
      // setTimeCreated(new Date());
      setSocketListener(
        Controller.client,
        setDurationMinutes,
        setParticipants,
        setRoles,
        setSecondsRemainingString,
        setActionButtonLabel
      );
    };

    // useEffect code
    if (Controller.client && Controller.client.webSocket?.socketState === Controller.client.webSocket?.OPEN_CODE) {
      return;
    }
    let wrapperSocket = new W3CWebSocketWrapper(url) as IWebSocketWrapper;
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
