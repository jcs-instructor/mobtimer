import { renderHomePage } from "./mobSocketServer";

export const port = parseInt(process.env.PORT || "") || 3000;
renderHomePage(port);
