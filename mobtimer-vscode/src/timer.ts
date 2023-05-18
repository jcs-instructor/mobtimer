import { window, StatusBarAlignment, StatusBarItem } from "vscode";

export class Timer {
  private _statusBarItem: StatusBarItem;

  public constructor() {
    this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
  }

  public update() {
    // Every second, update the status bar with the current time with seconds
    setInterval(() => {
      const text = `[ $(clock) CURRENT version24: ${this.getCurrentTime()} ]`;
      this._statusBarItem.text = text;
    }, 1000); // 1000 ms = 1 second
    this._statusBarItem.show();
  }

  private getCurrentTime() {
    let date = new Date();
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = date.getSeconds().toString().padStart(2, "0");
    let currentTime = `${hours}:${minutes}:${seconds}`;
    return currentTime;
  }

  dispose() {
    this._statusBarItem.dispose();
  }
}
