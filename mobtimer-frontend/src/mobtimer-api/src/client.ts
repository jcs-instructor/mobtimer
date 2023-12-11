import { IClientSocket } from "./iClientSocket";
import { MobRequestBuilder } from "./mobRequestBuilder";
import { Controller, Heartbeat } from './index';
const noSocketErrorMessage = "No socket";
class Client {
  private _webSocket: IClientSocket | undefined;
  private _heartbeat?: Heartbeat;

  constructor(webSocket: IClientSocket | undefined = undefined) {
    this._webSocket = webSocket;
  }

  get heartBeat () {
    return this._heartbeat as Heartbeat;
  }

  set heartBeat (heartbeat: Heartbeat) {
    this._heartbeat = heartbeat;
    heartbeat.start();
  }
  /**
   * Forces a process to wait until the socket's `readyState` becomes the specified value.
   * @param socket The socket whose `readyState` is being watched
   * @param state The desired `readyState` for the socket
   */
  static async waitForSocketState(
    socket: IClientSocket | undefined,
    state: number | undefined
  ): Promise<void> {
    if (!socket) {
      throw new Error(noSocketErrorMessage)
    }
    return new Promise(function (resolve) {
      setTimeout(function () {
        if (socket.socketState === state) {
          resolve();
        } else {
          Client.waitForSocketState(socket, state).then(resolve);
        }
      }, 100);
      // todo: timeout.unref() fails when running from frontend; why?
      // timeout.unref();
    });
  }

  public async waitForSocketState(state: number | undefined): Promise<void> {
    if (!this._webSocket) {
      return Promise.reject("No socket to wait for");
    }
    return Client.waitForSocketState(this._webSocket, state);
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
    console.log("sending add participant request")
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
    this.heartBeat?.restart();
    console.log("sending to server", Controller.staticController ? "existing controller" : "no controller")
    if (!this._webSocket) {
      throw new Error(noSocketErrorMessage);
    } else {
      if (this._webSocket?.OPEN_CODE !== this._webSocket?.socketState) { 
        await this.waitForSocketState(this.webSocket?.OPEN_CODE);
      }
      this._webSocket.sendToServer(requestString);
    }
  }

  public get webSocket(): IClientSocket | undefined {
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

export { Client };
