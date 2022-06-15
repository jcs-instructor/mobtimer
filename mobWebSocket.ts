import WebSocket from "ws";
export interface WebSocketInterface extends WebSocket {}
class MobWebSocket extends WebSocket implements WebSocketInterface {
  constructor(url: string) {
    super(url);
  }

  private _mobName = "";
  public get mobName(): string {
    return this._mobName;
  }
  public set mobName(value: string) {
    this._mobName = value;
  }
}

export { MobWebSocket };
