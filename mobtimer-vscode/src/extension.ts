import { commands, ExtensionContext } from "vscode";
import { VscodeMobTimer } from "./vscode-mobtimer";
import * as vscode from "vscode";

// The extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
  const debug = (context.extensionMode === vscode.ExtensionMode.Development);
  if (debug) {
    process.env.REACT_APP_WEBSOCKET_URL = `ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || "4000"}`;
  }
  console.log("In extension.ts, process.env.REACT_APP_WEBSOCKET_URL = ", process.env.REACT_APP_WEBSOCKET_URL);
  console.log('"mobtimer.display" is now active!');
  let vscodeMobTimer = new VscodeMobTimer();
  console.log("Done");

  // The commandId parameter must match the command field in package.json
  let disposable = commands.registerCommand(
    "mobtimer.display",
    () => {
      vscodeMobTimer.update();
    }
  );

  context.subscriptions.push(vscodeMobTimer);
  context.subscriptions.push(disposable);
}

export function deactivate() {}
