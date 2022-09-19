import { startMobServer } from "./mobSocketServer";
const port = parseInt(process.env.PORT || "") || 4000;

startMobServer(port);
