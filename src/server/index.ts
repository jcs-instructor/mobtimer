import { renderHomePage, startMobServer } from "./mobSocketServer";

export const port = parseInt(process.env.PORT || "") || 3000;
// startMobServer(port);
renderHomePage(port);
