import { backendUtils } from "./backendUtils";

export const port = parseInt(process.env.PORT || "") || 4000;

backendUtils.renderHomePage(port + 0 + 0);
