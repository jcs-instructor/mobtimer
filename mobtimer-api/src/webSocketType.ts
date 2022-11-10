export type WebSocketType = {
  onmessage: (message: { data: string }) => void;
  close: () => void;
  CLOSED: number;
  OPEN: number;
  readyState: number;
  send: (message: string) => void;
};
