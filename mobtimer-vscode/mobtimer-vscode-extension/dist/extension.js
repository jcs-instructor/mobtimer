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
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const vscode_mobtimer_1 = require("./vscode-mobtimer");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Congratulations Ethan, your extension "mobtimer.helloWorldversion24" is now active!');
        let vscodeMobTimer = new vscode_mobtimer_1.VscodeMobTimer();
        console.log("Done");
        let disposable = vscode_1.commands.registerCommand("mobtimer.helloWorldversion24", () => {
            vscodeMobTimer.update();
            console.log("Hello World version24 from mobtimer-vscode!!");
        });
        context.subscriptions.push(vscodeMobTimer);
        context.subscriptions.push(disposable);
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map