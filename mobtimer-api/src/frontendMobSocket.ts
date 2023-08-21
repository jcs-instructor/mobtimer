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
    this.sendToServer(MobRequestBuilder.sendEchoRequest());
  }

  joinMob(mobName: string) {
    console.log("sending join request", mobName);
    this.sendToServer(MobRequestBuilder.joinMob(mobName));
  }

  update(durationMinutes: number) {
    this.sendToServer(MobRequestBuilder.update(durationMinutes));
  }

  addParticipant(name: string) {
    this.sendToServer(MobRequestBuilder.addParticipant(name));
  }

  rotateParticipants() {
    this.sendToServer(MobRequestBuilder.rotateParticipants());
  }

  shuffleParticipants() {
    this.sendToServer(MobRequestBuilder.shuffleParticipants());
  }

  editParticipants(participants: string[]) {
    this.sendToServer(MobRequestBuilder.editParticipants(participants));
  }

  editRoles(roles: string[]) {
    this.sendToServer(MobRequestBuilder.editRoles(roles));
  }

  start() {
    console.log("sending start request");
    this.sendToServer(MobRequestBuilder.start());
  }

  pause() {
    console.log("sending pause request");
    this.sendToServer(MobRequestBuilder.pause());
  }

  reset() {
    console.log("sending reset request");
    this.sendToServer(MobRequestBuilder.reset());
  }

  async sendToServer(requestString: string) {
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
