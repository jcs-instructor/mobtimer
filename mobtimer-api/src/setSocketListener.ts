import { Controller, FrontendMobSocket, MobTimerResponses, Action, TimeUtils } from "./index";
export function setSocketListener(
  client: FrontendMobSocket,
  setDurationMinutes: (x: number) => void,
  setParticipants: (x: string[]) => void,
  setRoles: (x: string[]) => void,
  setSecondsRemainingString: (x: string) => void,
  setActionButtonLabel: (x: string) => void, 
  playAudio: () => void,
  getActionButtonLabel: () => string
) {
  if (!client.webSocket) {
    throw new Error("WebSocket is undefined");
  }

  client.webSocket.onmessageReceived = (message: { data: any }) => {
    // Get response from server
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
    } = Controller.translateResponseData(response);

    if (
      response.actionInfo.action === Action.Expired ||
      response.actionInfo.action === Action.Reset
    ) {
      playAudio();
    }

    // modify frontend mob timer
    Controller.changeFrontendStatus(Controller.frontendMobTimer, mobStatus);
    Controller.frontendMobTimer.setSecondsRemaining(secondsRemaining);
    Controller.frontendMobTimer.durationMinutes = durationMinutes;
    Controller.frontendMobTimer.editParticipants(participants);
    Controller.frontendMobTimer.editRoles(roles);

    // Derive mob label from response status
    const label = getActionButtonLabel();

    // update React state variables
    setDurationMinutes(durationMinutes);
    setParticipants(participants);
    setRoles(roles);
    setSecondsRemainingString(
      Controller.frontendMobTimer.secondsRemainingString
    );
    setActionButtonLabel(label);

    // Update browser tab title text
    Controller.updateSummary();

    if (response.mobState.status !== Controller.frontendMobTimer.status) {
      console.error(
        "PROBLEM - FRONT AND BACK END STATUS MISMATCH!!!!!!!!!! --- " +
          "Frontend Status: " +
          Controller.frontendMobTimer.status +
          ", " +
          "Backend Status:" +
          response.mobState.status
      );
    }
  };
}

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