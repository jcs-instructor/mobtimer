import {
  Client,
  MobTimerResponses,
  Action,
  TimeUtils,
  Controller,
} from "./index";

type StateSetters = {
  setRoles: (roles: string[]) => void;
  setParticipants: (participants: string[]) => void;
  setSecondsRemainingString: (secondsRemainingString: string) => void;
  setDurationMinutes: (durationMinutes: number) => void;
  setActionButtonLabel: (label: string) => void;
};

export type ListenerParameters = {
  stateSetters?: StateSetters;
  controller: Controller;
  playAudio: () => void;
  getActionButtonLabel: () => string;
};

export function setSocketListener(parameters: ListenerParameters) {
  const client = parameters.controller.client as Client;
  if (!client.webSocket) {
    throw new Error("WebSocket is undefined");
  }

  client.webSocket.onmessageReceived = (message: { data: any }) => {
    // Get response from server
    onmessageReceivedFunc(message, parameters);
  };
}

export const onmessageReceivedFunc = (
  message: { data: any },
  parameters: ListenerParameters
) => {
  const response = JSON.parse(
    message.data
  ) as MobTimerResponses.SuccessfulResponse;

  // todo: handle if response is not successful
  consoleLogResponse(response);

  const controller = parameters.controller;
  // Read response data
  const { mobStatus, durationMinutes, participants, roles, secondsRemaining } =
  controller.translateResponseData(response);

  if (
    response.actionInfo.action === Action.Expired ||
    response.actionInfo.action === Action.Reset
  ) {
    parameters.playAudio();
  }

  // modify frontend mob timer
  controller.changeFrontendStatus(controller.frontendMobTimer, mobStatus);
  controller.frontendMobTimer.setSecondsRemaining(secondsRemaining);
  controller.frontendMobTimer.durationMinutes = durationMinutes;
  controller.frontendMobTimer.editParticipants(participants);
  controller.frontendMobTimer.editRoles(roles);

  // Derive mob label from response status
  const label = parameters.getActionButtonLabel();

  // update React state variables
  parameters.stateSetters?.setDurationMinutes(durationMinutes);
  parameters.stateSetters?.setParticipants(participants);
  parameters.stateSetters?.setRoles(roles);
  parameters.stateSetters?.setSecondsRemainingString(controller.frontendMobTimer.secondsRemainingString);
  parameters.stateSetters?.setActionButtonLabel(label);

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
}
