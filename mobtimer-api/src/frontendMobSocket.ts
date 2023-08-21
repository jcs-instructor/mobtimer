import { Action } from "./action";
import * as MobTimerRequests from "./mobTimerRequests";
import { IFrontendSocket } from "./iFrontendSocket";
import { MobRequestBuilder } from "./mobRequestBuilder";
const noSocketErrorMessage = "No socket";
class FrontendMobSocket {
  private _webSocket: IFrontendSocket | undefined;

  constructor(webSocket: IFrontendSocket | undefined = undefined) {
    this._webSocket = webSocket;
  }

  /**
   * Forces a process to wait until the socket's `readyState` becomes the specified value.
   * @param socket The socket whose `readyState` is being watched
   * @param state The desired `readyState` for the socket
   */
  static async waitForSocketState(
    socket: IFrontendSocket | undefined,
    state: number | undefined
  ): Promise<void> {
    if (!socket) {
      throw new Error(noSocketErrorMessage)
    }
    return new Promise(function (resolve) {
      const timeout = setTimeout(function () {
        if (socket.socketState === state) {
          resolve();
        } else {
          FrontendMobSocket.waitForSocketState(socket, state).then(resolve);
        }
      }, 500);
      // todo: timeout.unref() fails when running from frontend; why?
      // timeout.unref();
    });
  }

  public async waitForSocketState(state: number | undefined): Promise<void> {
    if (!this._webSocket) {
      return Promise.reject("No socket to wait for");
    }
    return FrontendMobSocket.waitForSocketState(this._webSocket, state);
  }

  sendEchoRequest() {
    this.sendJSON(MobRequestBuilder.sendEchoRequest());
  }

  joinMob(mobName: string) {
    console.log("sending join request", mobName);
    this.sendJSON(MobRequestBuilder.joinMob(mobName));
  }

  update(durationMinutes: number) {
    this.sendJSON(MobRequestBuilder.update(durationMinutes));
  }

  addParticipant(name: string) {
    this.sendJSON(MobRequestBuilder.addParticipant(name));
  }

  rotateParticipants() {
    this.sendJSON(MobRequestBuilder.rotateParticipants());
  }

  shuffleParticipants() {
    this.sendJSON(MobRequestBuilder.shuffleParticipants());
  }

  editParticipants(participants: string[]) {
    this.sendJSON(MobRequestBuilder.editParticipants(participants));
  }

  editRoles(roles: string[]) {
    this.sendJSON(MobRequestBuilder.editRoles(roles));
  }

  start() {
    console.log("sending start request");
    this.sendJSON(MobRequestBuilder.start());
  }

  pause() {
    console.log("sending pause request");
    this.sendJSON(MobRequestBuilder.pause());
  }

  reset() {
    console.log("sending reset request");
    this.sendJSON(MobRequestBuilder.reset());
  }

  async sendJSON(requestString: string) {
    if (!this._webSocket) {
      throw new Error(noSocketErrorMessage);
    } else {
      await FrontendMobSocket.waitForSocketState(
        this.webSocket,
        this.webSocket?.OPEN_CODE
      );
      this._webSocket.sendMessage(requestString);
    }
  }

  public get webSocket(): IFrontendSocket | undefined {
    return this._webSocket;
  }

  async closeSocket() {
    if (!this.webSocket) {
      throw new Error(noSocketErrorMessage)
    }
    this.webSocket.closeSocket();
    await this.waitForSocketState(this.webSocket.CLOSED_CODE);
  }
}

export { FrontendMobSocket };
