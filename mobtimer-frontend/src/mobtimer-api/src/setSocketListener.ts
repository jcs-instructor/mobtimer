import { Client, MobTimerResponses, Action, TimeUtils, Controller } from "./index";
export function setSocketListener(
  setSecondsRemainingString: (secondsRemainingString: string) => void,
  setDurationMinutes: (durationMinutes: number) => void,
  controller: Controller,
  playAudio: () => void,
  getActionButtonLabel: () => string
) {
    const client = controller.client as Client; 
  if (!client.webSocket) {
    throw new Error("WebSocket is undefined");
  }

  client.webSocket.onmessageReceived = (message: { data: any }) => {
    // Get response from server
    onmessageReceivedFunc(setSecondsRemainingString, setDurationMinutes, controller, message, playAudio, getActionButtonLabel);
  };

 }

  export const onmessageReceivedFunc = (
    setSecondsRemainingString: (secondsRemainingString: string) => void,
    setDurationMinutes: (durationMinutes: number) => void,
    controller: Controller,
    message: { data: any },
    playAudio: () => void,
    getActionButtonLabel: () => string
  ) => {
    const response = JSON.parse(
      message.data
    ) as MobTimerResponses.SuccessfulResponse;

    // todo: handle if response is not successful
    consoleLogResponse(response);

    // Read response data
    const {
      mobStatus,
      durationMinutes,
      participants,
      roles,
      secondsRemaining,
    } = controller.translateResponseData(response);

    if (
      response.actionInfo.action === Action.Expired ||
      response.actionInfo.action === Action.Reset
    ) {
      playAudio();
    }

    // modify frontend mob timer
    controller.changeFrontendStatus(controller.frontendMobTimer, mobStatus);
    controller.frontendMobTimer.setSecondsRemaining(secondsRemaining);
    controller.frontendMobTimer.durationMinutes = durationMinutes;
    controller.frontendMobTimer.editParticipants(participants);
    controller.frontendMobTimer.editRoles(roles);

    // Derive mob label from response status
    const label = getActionButtonLabel();

    // update React state variables
    setDurationMinutes(durationMinutes);
    controller.setParticipants(participants);
    controller.setRoles(roles);
    setSecondsRemainingString(controller.frontendMobTimer.secondsRemainingString);
    controller.setActionButtonLabel(label);

    // Update browser tab title text
    controller.updateSummary();

    if (response.mobState.status !== controller.frontendMobTimer.status) {
      console.error(
        "PROBLEM - FRONT AND BACK END STATUS MISMATCH!!!!!!!!!! --- " +
          "Frontend Status: " +
          controller.frontendMobTimer.status +
          ", " +
          "Backend Status:" +
          response.mobState.status
      );
    }
  };

function consoleLogResponse(response: MobTimerResponses.SuccessfulResponse) {
  console.info(
    "Mob: " +
      response.mobState.mobName +
      " (" +
      response.mobState.participants.length +
      " Participant(s):" +
      response.mobState.participants.join(",") +
      "), " +
      "Action:" +
      response.actionInfo.action +
      ", " +
      "Status:" +
      response.mobState.status +
      ", DurationMin:" +
      response.mobState.durationMinutes +
      ", " +
      "RemainingSec:" +
      response.mobState.secondsRemaining +
      " (" +
      TimeUtils.getTimeString(response.mobState.secondsRemaining) +
      ") "
  );
};