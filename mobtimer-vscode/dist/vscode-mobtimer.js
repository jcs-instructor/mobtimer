"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VscodeMobTimer = void 0;
const vscode_1 = require("vscode");
const controller_1 = require("./controller/controller");
const constants_1 = require("./constants");
const vscode_2 = require("vscode");
const mobtimer_api_1 = require("mobtimer-api");
const mobtimer_api_2 = require("mobtimer-api");
class VscodeMobTimer {
    constructor() {
        this._seconds = 0;
        console.log("Debug VscodeMobTimer constructor");
        this._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this._playButton = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this._playButton.text = getPlayButtonLabel();
        this._playButton.show();
        const url = process.env.REACT_APP_WEBSOCKET_URL ||
            `ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || "4000"}`;
        const wrapperSocket = new mobtimer_api_2.WSWebSocketWrapper(url);
        controller_1.Controller.client = new mobtimer_api_1.MobSocketClient(wrapperSocket);
        console.log("Debug Controller.client", controller_1.Controller.client.webSocket ? "exists" : "does not exist");
        const mobName = "front-end-timer";
        controller_1.Controller.frontendMobTimer.timerExpireFunc = onExpire;
        const client = controller_1.Controller.client;
        controller_1.Controller.frontendMobTimer = new mobtimer_api_1.MobTimer(mobName);
        client.joinMob(mobName);
        client.webSocket.onmessageReceived = (message) => __awaiter(this, void 0, void 0, function* () {
            console.log("message received");
            controllerOnMessage(message);
            this._playButton.text = getPlayButtonLabel();
            this._playButton.show();
        });
        vscode_2.commands.registerCommand(constants_1.TOGGLE_TIMER_COMMAND, () => {
            if (controller_1.Controller.frontendMobTimer.nextCommand === mobtimer_api_1.Command.Start) {
                controller_1.Controller.frontendMobTimer.start();
                client.start();
            }
            else if (controller_1.Controller.frontendMobTimer.nextCommand === mobtimer_api_1.Command.Pause) {
                controller_1.Controller.frontendMobTimer.pause();
                client.pause();
            }
            else if (controller_1.Controller.frontendMobTimer.nextCommand === mobtimer_api_1.Command.Resume) {
                controller_1.Controller.frontendMobTimer.start();
                client.start();
            }
        });
        this._playButton.command = constants_1.TOGGLE_TIMER_COMMAND;
    }
    update() {
        console.log("update");
        setInterval(() => {
            console.log("Clicking version24");
            this._seconds++;
            const text = `[ $(clock) ${this._seconds} version24: ${controller_1.Controller.frontendMobTimer.secondsRemainingString} ]`;
            this._statusBarItem.text = text;
        }, 1000);
        this._statusBarItem.show();
    }
    dispose() {
        this._statusBarItem.dispose();
    }
}
exports.VscodeMobTimer = VscodeMobTimer;
function controllerOnMessage(message) {
    const response = JSON.parse(message.data);
    const { mobStatus, secondsRemaining } = controller_1.Controller.translateResponseData(response);
    controller_1.Controller.changeStatus(controller_1.Controller.frontendMobTimer, mobStatus);
    controller_1.Controller.frontendMobTimer.setSecondsRemaining(secondsRemaining);
}
function onExpire() {
    console.log("timer expired on front end");
}
function getPlayButtonLabel() {
    var _a;
    switch ((_a = controller_1.Controller.frontendMobTimer) === null || _a === void 0 ? void 0 : _a.nextCommand) {
        case mobtimer_api_1.Command.Pause: {
            return "⏸️ Pause";
        }
        case mobtimer_api_1.Command.Resume: {
            return "▶️ Resume";
        }
        case mobtimer_api_1.Command.Start: {
            return "▶️ Start";
        }
        default: {
            return "???";
        }
    }
}
//# sourceMappingURL=vscode-mobtimer.js.map