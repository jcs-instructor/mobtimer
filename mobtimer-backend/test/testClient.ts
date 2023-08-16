import { Action } from "mobtimer-api";
import { MobState } from "mobtimer-api";
import { processRawRequest } from "../src/server/backendSocket";
import { MobRequestBuilder } from "mobtimer-api";
import { MobTimerResponse, SuccessfulResponse } from "mobtimer-api/mobTimerResponse";

class TestClient {
  private _successfulResponses: string[] = [];
  private _echoReceived: boolean = false;
  private _errorReceived: boolean = false;
  private _mobName: string = "";
  private _socket: any;

  constructor(webSocket: any) {
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
  
  public get mobName(): string {
    return this._mobName;
  }

  sendEchoRequest() {
    const response = processRawRequest(MobRequestBuilder.sendEchoRequest(), this._socket);
    this.trackMessage(response);
  }

  joinMob(mobName: string) {
    // console.log("sending join request", mobName);
    const response = processRawRequest(MobRequestBuilder.joinMob(mobName), this._socket);
    this.trackMessage(response);
  }

  update(durationMinutes: number) {
    const response = processRawRequest(MobRequestBuilder.update(durationMinutes), this._socket);
    this.trackMessage(response);
  }

  addParticipant(name: string) {
    const response = processRawRequest(MobRequestBuilder.addParticipant(name), this._socket);
    this.trackMessage(response);
  }

  rotateParticipants() {
    const response = processRawRequest(MobRequestBuilder.rotateParticipants(), this._socket);
    this.trackMessage(response);
  }

  shuffleParticipants() {
    const response = processRawRequest(MobRequestBuilder.shuffleParticipants(), this._socket);
    this.trackMessage(response);
  }

  editParticipants(participants: string[]) {
    const response = processRawRequest(MobRequestBuilder.editParticipants(participants), this._socket);
    this.trackMessage(response);
  }

  editRoles(roles: string[]) {
    const response = processRawRequest(MobRequestBuilder.editRoles(roles), this._socket);
    this.trackMessage(response);
  }

  start() {
    // console.log("sending start request");
    const response = processRawRequest(MobRequestBuilder.start(), this._socket);
    this.trackMessage(response);
  }

  pause() {
    // console.log("sending pause request");
    const response = processRawRequest(MobRequestBuilder.pause(), this._socket);
    this.trackMessage(response);
  }

  reset() {
    // console.log("sending reset request");
    const response = processRawRequest(MobRequestBuilder.reset(), this._socket);
    this.trackMessage(response);
  }

  private trackMessage(responseObject: MobTimerResponse | undefined) {
    // console.log("responseObject", responseObject);
    if (responseObject) {
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
            // console.log("pushing responseObject", responseObject);
            this._successfulResponses.push(JSON.stringify(responseObject));
            break;
        }      
        }
    }
  }

  private convertToMobTimerResponse(response: string): MobTimerResponse {
    return JSON.parse(response) as MobTimerResponse;
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
    // console.log("lastSuccessfulResponse", this.lastSuccessfulResponse.mobState);
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

export { TestClient };
