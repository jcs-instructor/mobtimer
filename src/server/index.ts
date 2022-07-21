import { startMobServer } from "./mobSocketServer";

export const port = parseInt(process.env.PORT || "") || 3000;
startMobServer(port);