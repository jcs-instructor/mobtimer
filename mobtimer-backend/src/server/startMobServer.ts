import { startMobServer } from "./mobSocketServer";
const port = parseInt(process.env.PORT || "") || 4000;

console.log("Backend redeployed 1");
startMobServer(port);
