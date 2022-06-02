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
        // Create test client
        const client = new MobWebTestSocket(`ws://localhost:${port}`);
        await waitForSocketState(client, client.OPEN);

        const testMessage = mobMessage.joinMessage("awesome-team");
        let responseMessage: string;



        // Send client message
        client.send(testMessage);
        // Perform assertions on the response
        client.close()
        await waitForSocketState(client, client.CLOSED);
        responseMessage = client.receivedMessages[0];
        const parsedMessage = JSON.parse(responseMessage);
        expect(parsedMessage).toEqual(new MobTimer("awesome-team").state);
    });

});