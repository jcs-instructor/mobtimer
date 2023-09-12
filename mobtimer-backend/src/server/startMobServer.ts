import { backendUtils } from "./backendUtils";
const port = parseInt(process.env.PORT || "") || 4000;

console.log("Backend redeployed 1");
backendUtils.startMobServer(port);
