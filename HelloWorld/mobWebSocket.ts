import WebSocket from "ws";
export interface WebSocketInterface extends WebSocket {}
class MobWebSocket extends WebSocket implements WebSocketInterface {
  constructor(url) {
    super(url);
  }

  private _mobName: string;
  public get mobName(): string {
    return this._mobName;
  }
  public set mobName(value: string) {
    this._mobName = value;
  }
}

export { MobWebSocket };
