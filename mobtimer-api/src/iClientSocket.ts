export interface IClientSocket {
  socketState: number;
  sendToServer: (message: string) => void;
  closeSocket: () => void;
  OPEN_CODE: number;
  CLOSED_CODE: number;
  onmessageReceived: (message: { data: any }) => void;
}
