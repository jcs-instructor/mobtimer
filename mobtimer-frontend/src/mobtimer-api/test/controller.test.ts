import {
  IClientSocket,
  Client,
  Status,
  W3CClientSocket,
} from "../src";
import { Controller } from "../src/controller";
const controller = Controller.staticController;

describe("Change frontend status", () => {
  test("Ready to Running", () => {
    controller.changeFrontendStatus(
      controller.frontendMobTimer,
      Status.Running
    );
    expect(controller.frontendMobTimer.status).toBe(Status.Running);
  });

  test("Running to Paused", () => {
    controller.frontendMobTimer.start();
    controller.changeFrontendStatus(controller.frontendMobTimer, Status.Paused);
    expect(controller.frontendMobTimer.status).toBe(Status.Paused);
  });

  test("Running to Ready", () => {
    controller.frontendMobTimer.start();
    controller.changeFrontendStatus(controller.frontendMobTimer, Status.Ready);
    expect(controller.frontendMobTimer.status).toBe(Status.Ready);
  });
});
