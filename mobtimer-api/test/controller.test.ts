import {
  IFrontendSocket,
  FrontendMobSocket,
  Status,
  W3CFrontendSocket,
} from "../src";
import { Controller2 } from "../src/controller2";
const controller = Controller2.staticController;

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
