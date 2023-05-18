import { StatusBarAlignment, StatusBarItem, window } from "vscode";
import { Controller } from "./controller/controller";
import { TOGGLE_TIMER_COMMAND } from "./constants";
import { commands } from "vscode";

import {
  Command,
  IWebSocketWrapper,
  MobSocketClient,
  MobTimer,
  MobTimerResponses,
} from "mobtimer-api";
import { WSWebSocketWrapper } from "mobtimer-api";

export class VscodeMobTimer {
  private _statusBarItem: StatusBarItem;
  private _playButton: StatusBarItem;
  private _seconds = 0;

  public constructor() {
    console.log("Debug VscodeMobTimer constructor");
    this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
    this._playButton = window.createStatusBarItem(StatusBarAlignment.Left);
    this._playButton.text = getPlayButtonLabel();
    this._playButton.show();

    const url =
      process.env.REACT_APP_WEBSOCKET_URL ||
      `ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || "4000"}`;
    const wrapperSocket = new WSWebSocketWrapper(url) as IWebSocketWrapper;
    Controller.client = new MobSocketClient(wrapperSocket);
    console.log(
      "Debug Controller.client",
      Controller.client.webSocket ? "exists" : "does not exist"
    );
    const mobName = "front-end-timer";
    Controller.frontendMobTimer.timerExpireFunc = onExpire;
    const client = Controller.client;
    Controller.frontendMobTimer = new MobTimer(mobName);
    client.joinMob(mobName);
    client.webSocket.onmessageReceived = async (message: { data: string }) => {
      // Get response from server
      console.log("message received");
      controllerOnMessage(message);
      this._playButton.text = getPlayButtonLabel();
      this._playButton.show();
    };
    commands.registerCommand(TOGGLE_TIMER_COMMAND, () => {
      if (Controller.frontendMobTimer.nextCommand === Command.Start) {
        Controller.frontendMobTimer.start();
        client.start();
      } else if (Controller.frontendMobTimer.nextCommand === Command.Pause) {
        Controller.frontendMobTimer.pause();
        client.pause();
      } else if (Controller.frontendMobTimer.nextCommand === Command.Resume) {
        Controller.frontendMobTimer.start();
        client.start();
      }
    });
    this._playButton.command = TOGGLE_TIMER_COMMAND;
  }

  public update() {
    // Every second, update the status bar with the current time with seconds
    console.log("update");
    setInterval(() => {
      console.log("Clicking version24");
      this._seconds++;
      const text = `[ $(clock) ${this._seconds} version24: ${Controller.frontendMobTimer.secondsRemainingString} ]`;
      this._statusBarItem.text = text;
    }, 1000); // 1000 ms = 1 second
    this._statusBarItem.show();
  }

  dispose() {
    this._statusBarItem.dispose();
  }
}

function controllerOnMessage(message: { data: string }) {
  const response = JSON.parse(
    message.data
  ) as MobTimerResponses.SuccessfulResponse;

  // todo: handle if response is not successful
  // Read response data
  const { mobStatus, secondsRemaining } =
    Controller.translateResponseData(response);

  // modify frontend mob timer
  Controller.changeStatus(Controller.frontendMobTimer, mobStatus);
  Controller.frontendMobTimer.setSecondsRemaining(secondsRemaining);
}

// todo: in progress
// await client.waitForSocketState(WebSocket.OPEN_CODE);
// const mobName = "test-mob-temp-xxxxxxxxxxxxx"; // todo unhardcode
// client.joinMob(mobName);
// console.log('joined mob', mobName, client);

function onExpire() {
  console.log("timer expired on front end");
  // const audio = new Audio(soundSource);
  // audio.play();
}

function getPlayButtonLabel() {
  switch (Controller.frontendMobTimer?.nextCommand) {
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
      return "???";
    }
  }
}
