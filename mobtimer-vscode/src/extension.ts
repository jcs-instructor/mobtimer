import { commands, ExtensionContext } from "vscode";
import { VscodeMobTimer } from "./vscode-mobtimer";
import * as vscode from "vscode";

// The extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
  // Debug is true if running in debug mode.
  // If not debug, installed version is running.
  // used by VscodeMobTimer to determine url
  const isLocal = (context.extensionMode === vscode.ExtensionMode.Development);
  let vscodeMobTimer = new VscodeMobTimer(isLocal);
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
