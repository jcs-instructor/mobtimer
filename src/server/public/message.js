//import $ from "../../../node_modules/jquery";

export function msg() {
  alert("Hi");
}

const ws = new WebSocket("ws://localhost:3000");

ws.onopen = function (event) {
  alert("We're connected!");
  //$(".mob-status").append("<p>Test</p>");
};

// function joinMob() {
//     const client = await openSocket();
//     await client.joinMob(_mobName1);
//     await client.closeSocket();
//     expect(client.lastResponse.mobState).toEqual(new MobTimer(_mobName1).state);
//     expect(client.lastResponse.actionInfo.action).toEqual(Action.Join);
// }
