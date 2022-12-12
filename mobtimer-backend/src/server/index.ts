import { renderHomePage } from "./mobSocketServer";

export const port = parseInt(process.env.PORT || "") || 4000;

renderHomePage(port + 0 + 0);
