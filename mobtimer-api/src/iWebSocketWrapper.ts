
export interface IWebSocketWrapper {
  readyState: number;
  send: (message: string) => void;
  close: () => void;
  OPEN: number;
  CLOSED: number;
  onmessage: (message: any) => void;
}
