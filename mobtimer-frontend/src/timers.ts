import { MobSocketClient, MobTimer } from "mobtimer-api";

// todo: unhardcode port
const port = 4000;
const url = `ws://localhost:${port}`;
export const client = MobSocketClient.openSocketSync(url);

export const frontendMobTimer = new MobTimer('front-end-timer');
