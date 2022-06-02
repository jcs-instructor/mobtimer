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
        const client = new MobWebTestSocket(`ws://localhost:${port}`);
        await waitForSocketState(client, client.OPEN);
        const testMessage = mobMessage.joinMessage("awesome-team");
        let responseMessage: string;
        client.send(testMessage);
        client.close()
        await waitForSocketState(client, client.CLOSED);
        responseMessage = client.receivedMessages[0];
        const parsedMessage = JSON.parse(responseMessage);

        expect(parsedMessage).toEqual(new MobTimer("awesome-team").state);
    });

    test("Create 2 mobs", async () => {
        // todo: 2 very redundant code blocks:
        // block 1
        const client = new MobWebTestSocket(`ws://localhost:${port}`);
        await waitForSocketState(client, client.OPEN);
        const testMessage = mobMessage.joinMessage("awesome-team");
        let responseMessage: string;
        client.send(testMessage);
        client.close()
        await waitForSocketState(client, client.CLOSED);
        responseMessage = client.receivedMessages[0];
        const parsedMessage = JSON.parse(responseMessage);

        // block 2
        const client2 = new MobWebTestSocket(`ws://localhost:${port}`);
        await waitForSocketState(client2, client2.OPEN);
        const testMessage2 = mobMessage.joinMessage("good-team");
        let responseMessage2: string;
        client2.send(testMessage2);
        client2.close()
        await waitForSocketState(client2, client2.CLOSED);
        responseMessage2 = client2.receivedMessages[0];
        const parsedMessage2 = JSON.parse(responseMessage2);

        // Assertions
        expect(parsedMessage).toEqual(new MobTimer("awesome-team").state);
        expect(parsedMessage2).toEqual(new MobTimer("good-team").state);
    });


    // todo: add tests for update, pause, and start messages

});