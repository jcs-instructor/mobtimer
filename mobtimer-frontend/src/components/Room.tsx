import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Timer from "./Timer";
import Duration from "./Duration";
import Participants from "./Participants";
import AddParticipant from "./AddParticipant";
import RotateParticipants from "./RotateParticipants";
import EditRoles from "./EditRoles";
import Reset from "./Reset";
import ShuffleParticipants from "./ShuffleParticipants";
import { Controller, StringUtils } from "../mobtimer-api/src";


type FormParameters = {
  durationMinutes: number;
  setDurationMinutes: (durationMinutes: number) => void;
  broadcastDurationMinutes: (durationMinutes: number) => void;
  participants: string[];
  setParticipants: (participants: string[]) => void;
  roles: string[];
  actionButtonLabel: string;
  setMobName: (mobName: string) => void;
  setSecondsRemainingString: (timeRemainingString: string) => void;
  timeString: string;
  submitToggleAction: (event: React.FormEvent<HTMLFormElement>) => void;
  submitJoinMobRequest: () => void;
};

const Room = ({
  durationMinutes,
  setDurationMinutes,
  broadcastDurationMinutes,
  participants,
  setParticipants,
  roles,
  actionButtonLabel,
  setMobName,
  setSecondsRemainingString,
  timeString,
  submitToggleAction,
  submitJoinMobRequest,
}: FormParameters) => {
  const { mobNameUrlParam } = useParams() as { mobNameUrlParam: string };
  const controller = Controller.staticController as Controller;
  const [roleNames, setRoleNames] = useState(
    controller.frontendMobTimer.roles.join(",")
  );
  const mobNameLowerCase = mobNameUrlParam.toLowerCase();

  const submitEditRolesRequest = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    controller.client?.editRoles(StringUtils.splitAndTrim(roleNames));
  };

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
        <React.StrictMode>
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
        </React.StrictMode>

        {/* As of 1/17/2024, React.StrictMode isn't compatible with react-beautiful-dnd; see: https://github.com/atlassian/react-beautiful-dnd/issues/2407 */}
        <Participants
          participants={participants}
          setParticipants={setParticipants}
          roles={roles}
        />

        <React.StrictMode>
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

          <EditRoles
            submitEditRolesRequest={submitEditRolesRequest}
            roleNames={roleNames}
            setRoleNames={setRoleNames}
          />
          <hr />
        </React.StrictMode>
      </div>
    </>
  );
};

export default Room;
