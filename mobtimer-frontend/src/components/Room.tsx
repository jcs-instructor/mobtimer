import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Timer from './Timer';
import Duration from './Duration';
import Participants from './Participants';
import AddParticipant from './AddParticipant';
import RotateParticipants from './RotateParticipants';
import EditParticipants from './EditParticipants';
import EditRoles from './EditRoles';
import Reset from './Reset';
import ShuffleParticipants from './ShuffleParticipants';
import { Controller, StringUtils } from '../mobtimer-api/src';

type FormParameters = {
    durationMinutes: number;
    participants: string[];
    roles: string[];
    actionButtonLabel: string;
    setMobName: (mobName: string) => void;
    timeString: string;
    submitToggleAction: (event: React.FormEvent<HTMLFormElement>) => void;
    submitJoinMobRequest: () => void;
}

const Room = ({ durationMinutes, participants, roles, actionButtonLabel, setMobName, timeString, submitToggleAction, submitJoinMobRequest }: FormParameters) => {    
    const { mobNameUrlParam } = useParams() as { mobNameUrlParam: string };
    const controller = Controller.staticController as Controller;
    const [participantsNames, setParticipantsNames] = useState(controller.frontendMobTimer.participants.join(","));
    const mobNameLowerCase = mobNameUrlParam.toLowerCase();    

    const submitEditParticipantsRequest = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        controller.client?.editParticipants(StringUtils.splitAndTrim(participantsNames));
    }

    // todo: refactor reduncant code for debug boolean (also in App.tsx)
    
    const debug = window.location.href.includes('localhost');
    if (debug) {
        document.body.style.backgroundColor = "lightblue";
    }    
    
    useEffect(
        () => {
            setMobName(mobNameLowerCase);
            submitJoinMobRequest();
        },
        [mobNameLowerCase, setMobName, submitJoinMobRequest]
    );

    return (
        <>
            <div className={"RoomBox"}>
                
                <p className="Team">TEAM: {mobNameUrlParam}</p>
                
                <Timer timeString={timeString} />
                
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <form onSubmit={(e) => submitToggleAction(e)}>
                                    <button type="submit">{actionButtonLabel || "Service Unavailable - Try Refreshing Your Browser in 1-3 minutes"}</button>
                                </form>
                            </td>
                            <td><Reset /> {/* Cancel button */}</td>
                        </tr>
                    </tbody>
                </table>                
                
                <Duration durationMinutes={durationMinutes} />
                
                <hr />
                
                <Participants participants={participants} roles={roles} />
                
                <table>
                    <tbody>
                        <tr>
                            <td><RotateParticipants /></td>
                            <td><ShuffleParticipants /></td>
                        </tr>
                    </tbody>
                </table>
                
                <AddParticipant />
                <EditParticipants 
                    participantsNames={participantsNames} 
                    setParticipantsNames={setParticipantsNames} 
                    submitEditParticipantsRequest={submitEditParticipantsRequest} />
                
                <hr />

                <EditRoles />

            </div>
        </>
    )
}

export default Room