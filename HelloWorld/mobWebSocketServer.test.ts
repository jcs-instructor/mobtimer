import WebSocket from "ws";
import { startServer, waitForSocketState } from "./mobWebSocketUtils";
import * as util from "./mobWebSocketUtils"
import { MobTimer } from "./mobTimer";
import { MobWebTestSocket } from "./mobWebTestSocket";

const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
    let server;

    beforeAll(async () => {
        server = await startServer(port);
    });

    afterAll(() => server.close());

    test("Create mob", async () => {
        // Create test client
        const client = new MobWebTestSocket(`ws://localhost:${port}`);
        await waitForSocketState(client, client.OPEN);

        const testMessage = util.joinMessage("awesome-team");
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

    test("Server echoes the message it receives from client", async () => {
        // Create test client
        const client = new WebSocket(`ws://localhost:${port}`);
        await waitForSocketState(client, client.OPEN);

        const testMessage = "This is a test message";
        let responseMessage: WebSocket.Data;

        client.on("message", (data) => {
            responseMessage = data.toString();
        });

        // Send client message
        client.send(testMessage);
        client.close()

        // Perform assertions on the response
        await waitForSocketState(client, client.CLOSED);
        expect(responseMessage).toBe(testMessage);
    });
});