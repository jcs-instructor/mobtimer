import React from 'react';
import { Controller, StringUtils } from '../mobtimer-api/src';

const controller = Controller.staticController as Controller;

type FormParameters = {
    participantNames: string,
    setParticipantNames: (participantNames: string) => void,
    roleNames: string,
    setRoleNames: (roles: string) => void,
    submitEditParticipantsRequest: (event: React.FormEvent<HTMLFormElement>) => void
};

const EditParticipants = (formParameters: FormParameters) => {

    function areChangesPending(): boolean {        
        const participantsChanged = !StringUtils.areSameWhenTrim(formParameters.participantNames, controller.frontendMobTimer.participants.join(","));
        const rolesChanged = !StringUtils.areSameWhenTrim(formParameters.roleNames, controller.frontendMobTimer.roles.join(","));
        return participantsChanged || rolesChanged;
    };

    return (
        <form onSubmit={(event) => formParameters.submitEditParticipantsRequest(event)}>
            <label>Edit Participants: 
            <input
                value={formParameters.participantNames}
                onFocus={
                    (e) => {
                        e.target.value = controller.frontendMobTimer.participants.join(",");
                        formParameters.setParticipantNames(controller.frontendMobTimer.participants.join(","));
                    }
                }
                // onBlur={(e) => handleBlur(e)}
                onChange={(e) => formParameters.setParticipantNames(e.target.value)}
                type="text"
                placeholder="Enter/Edit Participants"
            />
            </label>
            <label>Edit Roles: 
            <input
                value={formParameters.roleNames}
                onFocus={
                    (e) => {
                        e.target.value = controller.frontendMobTimer.roles.join(",");
                        formParameters.setRoleNames(controller.frontendMobTimer.roles.join(","));
                    }
                }
                // onBlur={(e) => handleBlur(e)}
                onChange={(e) => formParameters.setRoleNames(e.target.value)}
                type="text"
                placeholder="Enter/Edit Roles"
            />
            </label>

            <button type="submit" disabled={!areChangesPending()}>Save</button>
        </form>
    )
}



export default EditParticipants
