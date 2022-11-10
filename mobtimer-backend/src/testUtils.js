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
exports.convertToMobTimerResponse = exports.waitForLastResponse = exports.waitForSocketState = void 0;
const port = 4000 + Number(process.env.JEST_WORKER_ID);
function waitForSocketState(socket, state) {
    return new Promise(function (resolve) {
        const timeout = setTimeout(function () {
            if (socket.readyState === state) {
                resolve();
            }
            else {
                waitForSocketState(socket, state).then(resolve);
            }
        });
        timeout.unref();
    });
}
exports.waitForSocketState = waitForSocketState;
function waitForLastResponse(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        yield socket.sendEchoRequest();
        yield waitForEcho(socket);
    });
}
exports.waitForLastResponse = waitForLastResponse;
function waitForEcho(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve) {
            const timeout = setTimeout(function () {
                if (socket.echoReceived) {
                    resolve();
                }
                waitForEcho(socket).then(resolve);
            }, 10);
            timeout.unref();
        });
    });
}
function convertToMobTimerResponse(response) {
    return JSON.parse(response);
}
exports.convertToMobTimerResponse = convertToMobTimerResponse;
//# sourceMappingURL=testUtils.js.map