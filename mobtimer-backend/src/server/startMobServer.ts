import { startMobServer } from "./mobSocketServer";
const port = parseInt(process.env.PORT || "") || 3000;

startMobServer(port);
