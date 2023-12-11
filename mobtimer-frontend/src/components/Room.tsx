import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Timer from "./Timer";
import Duration from "./Duration";
import Participants from "./Participants";
import AddParticipant from "./AddParticipant";
import RotateParticipants from "./RotateParticipants";
import EditParticipants from "./EditParticipants";
import Reset from "./Reset";
import ShuffleParticipants from "./ShuffleParticipants";
import { Controller } from "../mobtimer-api/src";

type FormParameters = {
  durationMinutes: number;
  setDurationMinutes: (durationMinutes: number) => void;
  broadcastDurationMinutes: (durationMinutes: number) => void;
  participants: string[];
  roles: string[];
  actionButtonLabel: string;
  setMobName: (mobName: string) => void;
  setSecondsRemainingString: (timeRemainingString: string) => void;
  timeString: string;
  submitToggleAction: (event: React.FormEvent<HTMLFormElement>) => void;
  submitJoinMobRequest: () => void;
  submitEditParticipants: ({ participantNames, roleNames }: {participantNames: string, roleNames: string}) => void;
};

const Room = ({
  durationMinutes,
  setDurationMinutes,
  broadcastDurationMinutes,
  participants,
  roles,
  actionButtonLabel,
  setMobName,
  setSecondsRemainingString,
  timeString,
  submitToggleAction,
  submitJoinMobRequest,
  submitEditParticipants,
}: FormParameters) => {
  const { mobNameUrlParam } = useParams() as { mobNameUrlParam: string };
  const controller = Controller.staticController as Controller;
  console.log("ROOM.TSX", controller.client ? "debug client exists" : "client null",
  Controller.staticController?.client ? "static client exists" : "static client null")
  const [participantNames, setParticipantNames] = useState(
    controller.frontendMobTimer.participants.join(",")
  );
  const [roleNames, setRoleNames] = useState(
    controller.frontendMobTimer.roles.join(",")
  );
  const mobNameLowerCase = mobNameUrlParam.toLowerCase();

  // todo: refactor reduncant code for debug boolean (also in App.tsx)

  const debug = window.location.href.includes("localhost");
  if (debug) {
    document.body.style.backgroundColor = "lightblue";
  }

  useEffect(() => {
    console.log("Room.tsx: useEffect: mobNameLowerCase: ", mobNameLowerCase); 
    setMobName(mobNameLowerCase);
    submitJoinMobRequest();
  }, [mobNameLowerCase, setMobName, submitJoinMobRequest]);

  return (
    <>
      <div className={"RoomBox"}>
        <p className="Team">TEAM: {mobNameUrlParam}</p>

        <Timer
          setSecondsRemainingString={setSecondsRemainingString}
          timeString={timeString}
        />

        <table>
          <tbody>
            <tr>
              <td>
                <form onSubmit={(e) => submitToggleAction(e)}>
                  <button type="submit">
                    {actionButtonLabel ||
                      "Service Unavailable - Try Refreshing Your Browser in 1-3 minutes"}
                  </button>
                </form>
              </td>
              <td>
                <Reset /> {/* Cancel button */}
              </td>
            </tr>
          </tbody>
        </table>

        <Duration
          durationMinutes={durationMinutes}
          setDurationMinutes={setDurationMinutes}
          broadcastDurationMinutes={broadcastDurationMinutes}
        />

        <hr />

        <Participants participants={participants} roles={roles} />

        <table>
          <tbody>
            <tr>
              <td>
                <RotateParticipants />
              </td>
              <td>
                <ShuffleParticipants />
              </td>
            </tr>
          </tbody>
        </table>

        <AddParticipant />
        <hr />
        <EditParticipants
          participantNames={participantNames}
          setParticipantNames={setParticipantNames}
          submitEditParticipants={submitEditParticipants}
          roleNames={roleNames}
          setRoleNames={setRoleNames}
        />


      </div>
    </>
  );
};

export default Room;
