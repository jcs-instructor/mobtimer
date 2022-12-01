import "./index.css";
import { h, app } from "hyperapp";
// import JoinMobForm from "./components/JoinMobForm";
// import JoinMobHeading from "./components/JoinMobHeading";
import { MobSocketClient } from "mobtimer-api";
// import { waitForSocketState } from "mobtimer-api";
// import ActionButton from "./components/ActionButton";
// import { MobTimerResponses } from "mobtimer-api";
// import { Status } from "mobtimer-api";
// import * as Controller from "./controller";

// todo: unhardcode port
const port = 4000;
const url = `ws://localhost:${port}`;
const client = MobSocketClient.openSocketSync(url);

const state = {
  count: 0,
};

const actions = {
  down: () => (state) => ({ count: state.count - 1 }),
  up: () => (state) => ({ count: state.count + 1 }),
};

const view = (state, actions) => (
  <main class="wrapper">
    <h1 class="title">{state.count}</h1>
    <div class="actions">
      <button onclick={actions.down} class="down">
        -
      </button>
      <button onclick={actions.up} class="up">
        +
      </button>
    </div>
  </main>
);

export const main = app(state, actions, view, document.body);
