import { Action } from "./action";
import * as MobTimerRequests from "./mobTimerRequests";
import { IWebSocketWrapper } from "./iWebSocketWrapper";
import { MobRequestBuilder } from "./mobRequestBuilder";
const noSocketErrorMessage = "No socket";
class MobSocketClient {
  private _webSocket: IWebSocketWrapper | undefined;

  constructor(webSocket: IWebSocketWrapper | undefined = undefined) {
    this._webSocket = webSocket;
  }

  /**
   * Forces a process to wait until the socket's `readyState` becomes the specified value.
   * @param socket The socket whose `readyState` is being watched
   * @param state The desired `readyState` for the socket
   */
  static async waitForSocketState(
    socket: IWebSocketWrapper | undefined,
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
          MobSocketClient.waitForSocketState(socket, state).then(resolve);
        }
      }, 5);
      // todo: timeout.unref() fails when running from frontend; why?
      // timeout.unref();
    });
  }

  public async waitForSocketState(state: number | undefined): Promise<void> {
    if (!this._webSocket) {
      return Promise.reject("No socket to wait for");
    }
    return MobSocketClient.waitForSocketState(this._webSocket, state);
  }

  sendEchoRequest() {
    this.sendJSON({ action: Action.Echo } as MobTimerRequests.EchoRequest);
  }

  joinMob(mobName: string) {
    console.log("sending join request", mobName);
    this.sendJSON(MobRequestBuilder.joinMob(mobName));
  }

  update(durationMinutes: number) {
    this.sendJSON({
      action: Action.Update,
      value: { durationMinutes },
    } as MobTimerRequests.UpdateRequest);
  }

  addParticipant(name: string) {
    this.sendJSON({
      action: Action.AddParticipant,
      name: name,
    } as MobTimerRequests.AddParticipantRequest);
  }

  rotateParticipants() {
    this.sendJSON({
      action: Action.RotateParticipants,
    } as MobTimerRequests.RotateParticipantsRequest);
  }

  shuffleParticipants() {
    this.sendJSON({
      action: Action.ShuffleParticipants,
    } as MobTimerRequests.ShuffleParticipantsRequest);
  }

  editParticipants(participants: string[]) {
    this.sendJSON({
      action: Action.EditParticipants,
      participants: participants,
    } as MobTimerRequests.EditParticipantsRequest);
  }

  editRoles(roles: string[]) {
    this.sendJSON({
      action: Action.EditRoles,
      roles: roles,
    } as MobTimerRequests.EditRolesRequest);
  }

  start() {
    console.log("sending start request");
    this.sendJSON({ action: Action.Start } as MobTimerRequests.StartRequest);
  }

  pause() {
    console.log("sending pause request");
    this.sendJSON({ action: Action.Pause } as MobTimerRequests.PauseRequest);
  }

  reset() {
    console.log("sending reset request");
    this.sendJSON({ action: Action.Reset } as MobTimerRequests.ResetRequest);
  }

  protected async sendJSON(request: MobTimerRequests.MobTimerRequest) {
    if (!this._webSocket) {
      throw new Error(noSocketErrorMessage);
    } else {
      await MobSocketClient.waitForSocketState(
        this.webSocket,
        this.webSocket?.OPEN_CODE
      );
      this._webSocket.sendMessage(JSON.stringify(request));
    }
  }

  public get webSocket(): IWebSocketWrapper | undefined {
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

export { MobSocketClient };
