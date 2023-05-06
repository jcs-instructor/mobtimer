export interface IWebSocketWrapper {
  socketState: number;
  sendMessage: (message: string) => void;
  closeSocket: () => void;
  OPEN_CODE: number;
  CLOSED_CODE: number;
  onmessageReceived: (message: { data: any }) => void;
}
