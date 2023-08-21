import {
  IWebSocketWrapper,
  FrontendMobSocket,
  Status,
  W3CWebSocketWrapper,
} from "../src";
import { Controller } from "../src/controller";


describe("Change frontend status", () => {
  test("Ready to Running", () => {
    Controller.changeFrontendStatus(
      Controller.frontendMobTimer,
      Status.Running
    );
    expect(Controller.frontendMobTimer.status).toBe(Status.Running);
  });

  test("Running to Paused", () => {
    Controller.frontendMobTimer.start();
    Controller.changeFrontendStatus(Controller.frontendMobTimer, Status.Paused);
    expect(Controller.frontendMobTimer.status).toBe(Status.Paused);
  });

  test("Running to Ready", () => {
    Controller.frontendMobTimer.start();
    Controller.changeFrontendStatus(Controller.frontendMobTimer, Status.Ready);
    expect(Controller.frontendMobTimer.status).toBe(Status.Ready);
  });
});
