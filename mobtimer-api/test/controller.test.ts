import { IWebSocketWrapper, MobSocketClient, W3CWebSocketWrapper } from 'mobtimer-api';
import { Controller } from 'mobtimer-api';

test("Change frontend status from Ready to Running", () => {
    const runningLocal = true;
    const url = runningLocal 
        ? `ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || "4000"}` 
        : process.env.REACT_APP_WEBSOCKET_URL as string;
    const wrapperSocket = new W3CWebSocketWrapper(url) as IWebSocketWrapper; 
    // todo: test if connected and retry if not
    Controller.client = new MobSocketClient(wrapperSocket);
    const client = Controller.client;
});

