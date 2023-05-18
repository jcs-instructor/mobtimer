"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const vscode_1 = require("vscode");
class Timer {
    constructor() {
        this._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
    }
    update() {
        setInterval(() => {
            const text = `[ $(clock) CURRENT version24: ${this.getCurrentTime()} ]`;
            this._statusBarItem.text = text;
        }, 1000);
        this._statusBarItem.show();
    }
    getCurrentTime() {
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
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map