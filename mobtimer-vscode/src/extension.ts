import { commands, ExtensionContext } from "vscode";
import { VscodeMobTimer } from "./vscode-mobtimer";
import * as vscode from "vscode";

// The extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
  // When running in debug mode, we want to use localhost.
  // When running the installed mobtimer-vscode extension, we want to use the deployed url.
  const useLocalHost = (context.extensionMode === vscode.ExtensionMode.Development);
  let vscodeMobTimer = new VscodeMobTimer(useLocalHost);
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
