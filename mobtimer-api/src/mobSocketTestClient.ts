import { waitForSocketState } from "./testUtils";
import { MobTimerResponse, SuccessfulResponse } from "./mobTimerResponse";
import { Action } from "./action";
import { WebSocketType } from "./webSocketType";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { MobSocketClient } from "./mobSocketClient";

class MobSocketTestClient extends MobSocketClient {
  private _successfulResponses: string[] = [];
  private _echoReceived: boolean = false;
  private _errorReceived: boolean = false;

  constructor(webSocket: WebSocketType) {
    super(webSocket);
    webSocket.onmessage = (message) => {
      this.trackMessage(message);
    };
  }

  private trackMessage(message: { data: string }) {
    const responseObject = this.convertToMobTimerResponse(message.data);
    switch (responseObject.actionInfo.action) {
      case Action.Echo: {
        this._echoReceived = true;
        break;
      }
      case Action.InvalidRequestError: {
        this._errorReceived = true;
        break;
      }
      default: {
        console.log("pushing message.data", message.data);
        this._successfulResponses.push(message.data);
        break;
      }
    }
  }

  private convertToMobTimerResponse(response: string): MobTimerResponse {
    return JSON.parse(response) as MobTimerResponse;
  }

  static openSocketSync(url: string): MobSocketTestClient {
    const socket = new W3CWebSocket(url);
    const mobSocketTestClient = new MobSocketTestClient(socket);
    return mobSocketTestClient;
  }

  static async openSocket(url: string): Promise<MobSocketTestClient> {
    const socket = new W3CWebSocket(url);
    const mobSocketTestClient = new MobSocketTestClient(socket);
    await waitForSocketState(
      mobSocketTestClient.webSocket,
      mobSocketTestClient.webSocket.OPEN
    );
    return mobSocketTestClient;
  }

  public get lastSuccessfulResponse(): SuccessfulResponse {
    return JSON.parse(
      this._successfulResponses.at(-1) || ""
    ) as SuccessfulResponse;
  }

  public get successfulResponses(): string[] {
    return [...this._successfulResponses];
  }

  public get echoReceived(): boolean {
    return this._echoReceived;
  }

  public get errorReceived(): boolean {
    return this._errorReceived;
  }
}

export { MobSocketTestClient };
