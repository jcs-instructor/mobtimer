import { StatusBarAlignment, StatusBarItem, window } from "vscode";
import { TOGGLE_TIMER_COMMAND } from "./constants";
import { commands } from "vscode";

import {
  Controller,
  Command,
  IClientSocket,
  Client,
  MobTimer,
  MobTimerResponses,
  WSClientSocket,
} from "./mobtimer-api";

const controller = Controller.staticController;

export class VscodeMobTimer {
  private _statusBarItem: StatusBarItem;
  private _playButton: StatusBarItem;

  public constructor(useLocalHost = true) {
    console.log("Debug VscodeMobTimer constructor");
    this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
    this._playButton = window.createStatusBarItem(StatusBarAlignment.Left);
    this._playButton.text = getPlayButtonLabel();
    this._playButton.show();
    const url = controller.getUrl(useLocalHost);
    console.log("In extension.ts, url = ", url);
    console.log('"mobtimer.display" is now active!');

    
    const wrapperSocket = new WSClientSocket(url) as IClientSocket;
    controller.client = new Client(wrapperSocket);
    console.log(
      "Debug controller.client",
      controller.client.webSocket ? "exists" : "does not exist"
    );
    const mobName = "hippo-time";
    controller.frontendMobTimer.timerExpireFunc = onExpire;
    const client = controller.client;
    controller.frontendMobTimer = new MobTimer(mobName);
    client.joinMob(mobName);
    client.update(8);
    if (!client.webSocket) {
      return;
    }
    client.webSocket.onmessageReceived = async (message: { data: string }) => {
      // Get response from server
      console.log("message received");
      controllerOnMessage(message);
      this._playButton.text = getPlayButtonLabel();
      this._playButton.show();
    };
    commands.registerCommand(TOGGLE_TIMER_COMMAND, () => {
      if (controller.frontendMobTimer.nextCommand === Command.Start) {
        controller.frontendMobTimer.start();
        client.start();
      } else if (controller.frontendMobTimer.nextCommand === Command.Pause) {
        controller.frontendMobTimer.pause();
        client.pause();
      } else if (controller.frontendMobTimer.nextCommand === Command.Resume) {
        controller.frontendMobTimer.start();
        client.start();
      }
    });
    this._playButton.command = TOGGLE_TIMER_COMMAND;
  }

  public update() {
    // Every second, update the status bar with the current time with seconds
    console.log("update");
    setInterval(() => {
      console.log("Clicking ");
      const text = `[${
        controller.frontendMobTimer.secondsRemainingString
      } ${controller.createListOfParticipantsWithRoleEmojisPrepended()} ]`; //$(clock)
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
    controller.translateResponseData(response);

  // modify frontend mob timer
  controller.changeFrontendStatus(controller.frontendMobTimer, mobStatus);
  controller.frontendMobTimer.setSecondsRemaining(secondsRemaining);
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
  switch (controller.frontendMobTimer?.nextCommand) {
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
