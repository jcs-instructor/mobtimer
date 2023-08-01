import { MobTimerResponse, SuccessfulResponse } from "./mobTimerResponse";
import { Action } from "./action";
import { MobSocketClient } from "./mobSocketClient";
import { MobState } from "./mobState";
import { IWebSocketWrapper } from "./iWebSocketWrapper";
import { MobTimerRequests } from "mobtimer-api";

class MobRequestBuilder {

  static sendEchoRequest() {
    const request = { action: Action.Echo } as MobTimerRequests.EchoRequest;
    return JSON.stringify(request);
  }

  static joinMob(mobName: string) {
    const request = {
      action: Action.Join,
      mobName,
    } as MobTimerRequests.JoinRequest;
    return JSON.stringify(request);
  }

  static update(durationMinutes: number) {
    const request = {
      action: Action.Update,
      value: { durationMinutes },
    } as MobTimerRequests.UpdateRequest;
    return JSON.stringify(request);
  }

  static addParticipant(name: string) {
    const request = {
      action: Action.AddParticipant,
      name: name,
    } as MobTimerRequests.AddParticipantRequest;
    return JSON.stringify(request);
  }

  static rotateParticipants() {
    const request = {
      action: Action.RotateParticipants,
    } as MobTimerRequests.RotateParticipantsRequest;
    return JSON.stringify(request);
  }

  static shuffleParticipants() {
    const request = {
      action: Action.ShuffleParticipants,
    } as MobTimerRequests.ShuffleParticipantsRequest;
    return JSON.stringify(request);
  }

  static editParticipants(participants: string[]) {
    const request = {
      action: Action.EditParticipants,
      participants: participants,
    } as MobTimerRequests.EditParticipantsRequest;
    return JSON.stringify(request);
  }

  static editRoles(roles: string[]) {
    const request = {
      action: Action.EditRoles,
      roles: roles,
    } as MobTimerRequests.EditRolesRequest;
    return JSON.stringify(request);
  }

  static start() {
    console.log("sending start request");
    const request = { action: Action.Start } as MobTimerRequests.StartRequest;
    return JSON.stringify(request);
  }

  pause() {
    console.log("sending pause request");
    const request = { action: Action.Pause } as MobTimerRequests.PauseRequest;
    return JSON.stringify(request);
  }

  reset() {
    console.log("sending reset request");
    const request = { action: Action.Reset } as MobTimerRequests.ResetRequest;
    return JSON.stringify(request);
  }

}

export { MobRequestBuilder };
