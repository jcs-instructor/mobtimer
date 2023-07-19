import { MobTimerResponse, SuccessfulResponse } from "./mobTimerResponse";
import { Action } from "./action";
import { MobSocketClient } from "./mobSocketClient";
import { MobState } from "./mobState";
import { IWebSocketWrapper } from "./iWebSocketWrapper";

class MobSocketTestClient extends MobSocketClient {
  private _successfulResponses: string[] = [];
  private _echoReceived: boolean = false;
  private _errorReceived: boolean = false;
  private _mobName: string = "";
  private _socket: IWebSocketWrapper;

  constructor(webSocket: IWebSocketWrapper) {
    super(webSocket);
    this._socket = webSocket;
    this._socket.onmessageReceived = (message) => {
      this.trackMessage(message);
    };
  }

  resetClient() {
    this._echoReceived = false;
    this._successfulResponses = [];
    this._errorReceived = false;
    this._mobName = "";
  }
  
  override joinMob(mobName: string) {
    this._mobName = mobName;
    super.joinMob(mobName);
  }

  public get mobName(): string {
    return this._mobName;
  }

  private trackMessage(message: { data: any }) {
    const responseObject = this.convertToMobTimerResponse(
      message.data as string
    );
    console.log("responseObject", responseObject);
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

  static async waitForOpenSocket(
    webSocket: IWebSocketWrapper
  ): Promise<MobSocketTestClient> {
    const mobSocketTestClient = new MobSocketTestClient(webSocket);
    await mobSocketTestClient.waitForSocketState(
      mobSocketTestClient.webSocket.OPEN_CODE
    );
    return mobSocketTestClient;
  }

  public async waitForLastResponse() {
    await super.sendEchoRequest();
    await this.waitForEcho();
  }

  async waitForEcho(): Promise<void> {
    const client = this;
    return new Promise(function (resolve) {
      const timeout = setTimeout(function () {
        if (client.echoReceived) {          
          resolve();
        }
        client.waitForEcho().then(resolve);
      }, 10);
      timeout.unref();
    });
  }

  public get lastSuccessfulResponse(): SuccessfulResponse {
    return JSON.parse(
      this._successfulResponses.at(-1) || ""
    ) as SuccessfulResponse;
  }

  public get lastSuccessfulAction(): Action {
    const lastSuccessfulResponse = this.lastSuccessfulResponse;
    return lastSuccessfulResponse.actionInfo.action;
  }

  public get lastSuccessfulMobState(): MobState {
    console.log("lastSuccessfulResponse", this.lastSuccessfulResponse.mobState);
    const lastSuccessfulResponse = this.lastSuccessfulResponse;
    return lastSuccessfulResponse.mobState;
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
