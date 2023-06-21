import { IWebSocketWrapper, MobSocketClient, Status, W3CWebSocketWrapper } from '../src';
import { Controller } from '../src/controller';

test("Change frontend status from Ready to Running", () => {
    const runningLocal = true;
    const url = runningLocal 
        ? `ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || "4000"}` 
        : process.env.REACT_APP_WEBSOCKET_URL as string;
    const wrapperSocket = new W3CWebSocketWrapper(url) as IWebSocketWrapper; 
    // todo: test if connected and retry if not
    Controller.client = new MobSocketClient(wrapperSocket);
    const client = Controller.client;
    Controller.changeFrontendStatus(Controller.frontendMobTimer, Status.Running);
    expect(Controller.frontendMobTimer.status).toBe(Status.Running);
});

