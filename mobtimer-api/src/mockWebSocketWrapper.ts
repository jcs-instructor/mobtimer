import { IWebSocketWrapper } from "./iWebSocketWrapper";

export class MockWebSocketWrapper implements IWebSocketWrapper {
  private _socketState = 0;
  private _handler = (message: { data: any }) => console.log(message);

  constructor() {}

  public get socketState(): number {
    return this._socketState;
  }

  public sendMessage(message: string): void {
    // TODO: hand message to server
    console.log("message", message);
  }

  public closeSocket(): void {
    this._socketState = this.CLOSED_CODE;
  }

  public get OPEN_CODE(): number {
    return 1;
  }

  public get CLOSED_CODE(): number {
    return 0;
  }

  public set onmessageReceived(handler: (message: { data: any }) => void) {
    this._handler = handler;
  }
}
