import WebSocket from "ws";
import { startServer, waitForSocketState } from "./hippoSocketTestUtils";
import * as util from "./hippoSocketTestUtils"
import { MobTimer } from "./mobTimer";
import { hippoMobTestSocket } from "./hippoMobTestSocket";
import { hippoMobWebSocket } from "./hippoMobWebSocket";

const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
    let server;

    beforeAll(async () => {
        server = await startServer(port);
    });

    afterAll(() => server.close());

    test("Create mob", async () => {
        // Create test client
        const client = new hippoMobTestSocket(`ws://localhost:${port}`);
        const x = new hippoMobWebSocket(`ws://localhost:${port}`)
        await waitForSocketState(client, client.OPEN);

        const testMessage = util.joinMessage("awesome-team");
        let responseMessage: WebSocket.Data;

        client.on("message", (data) => {
            responseMessage = data.toString();

            // Close the client after it receives the response
            client.close();
        });

        // Send client message
        console.log("about to send", testMessage)
        client.send(testMessage);

        // Perform assertions on the response
        await waitForSocketState(client, client.CLOSED);
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

            // Close the client after it receives the response
            client.close();
        });

        // Send client message
        console.log("about to send", testMessage)
        client.send(testMessage);

        // Perform assertions on the response
        await waitForSocketState(client, client.CLOSED);
        expect(responseMessage).toBe(testMessage);
    });
});