export interface IClientSocket {
  socketState: number;
  sendToServer: (message: string) => void;
  closeSocket: () => void;
  CONNECTING_CODE: number;
  OPEN_CODE: number;
  CLOSING_CODE: number;
  CLOSED_CODE: number;
  onmessageReceived: (message: { data: any }) => void;
}
