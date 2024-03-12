import React from 'react';
import { Controller, StringUtils } from '../mobtimer-api/src';

const controller = Controller.staticController as Controller;

type FormParameters = {
    roleNames: string,
    setRoleNames: (roles: string) => void,
    submitEditRolesRequest: (event: React.FormEvent<HTMLFormElement>) => void
};

const EditRoles = (formParameters: FormParameters) => {

    function areChangesPending(): boolean {        
        const rolesChanged = !StringUtils.areSameWhenTrim(formParameters.roleNames, controller.frontendMobTimer.roles.join(","));
        return rolesChanged;
    };

    return (
        <form onSubmit={(event) => formParameters.submitEditRolesRequest(event)}>

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



export default EditRoles
