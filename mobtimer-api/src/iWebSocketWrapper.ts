export interface IWebSocketWrapper {
  socketState: number;
  sendMessage: (message: string) => void;
  closeSocket: () => void;
  timeCreated: Date | undefined;
  OPEN_CODE: number;
  CLOSED_CODE: number;
  onmessageReceived: (message: { data: any }) => void;
}
