import WebSocket from "ws";
import { startMobServer } from "./mobWebSocketUtils";
import { waitForSocketState } from "./webSocketUtils";
import * as mobMessage from "./mobWebMessages";
import { MobTimer } from "./mobTimer";
import { MobWebTestSocket } from "./mobWebTestSocket";

const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
    let server;

    beforeAll(async () => {
        server = await startMobServer(port);
    });

    afterAll(() => server.close());

    test("Create mob", async () => {
        const testMessage = mobMessage.joinMessage("awesome-team");
        const parsedMessage = await sendMessage(testMessage);
        expect(parsedMessage).toEqual(new MobTimer("awesome-team").state);
    });

    test("Create 2 mobs", async () => {
        const testMessage = mobMessage.joinMessage("awesome-team");
        const parsedMessage = await sendMessage(testMessage);

        const testMessage2 = mobMessage.joinMessage("good-team");
        const parsedMessage2 = await sendMessage(testMessage2);

        // Assertions
        expect(parsedMessage).toEqual(new MobTimer("awesome-team").state);
        expect(parsedMessage2).toEqual(new MobTimer("good-team").state);
    });


    // todo: add tests for update, pause, and start messages

});

async function sendMessage(message: string) {
    const client = new MobWebTestSocket(`ws://localhost:${port}`);
    await waitForSocketState(client, client.OPEN);
    let responseMessage: string;
    client.send(message);
    client.close();
    await waitForSocketState(client, client.CLOSED);
    responseMessage = client.receivedMessages[0];
    const parsedMessage = JSON.parse(responseMessage);
    return parsedMessage;
}
