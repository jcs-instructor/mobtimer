import React, { useState } from 'react';
import { Controller } from '../mobtimer-api/src';
const controller = Controller.staticController as Controller;

const EditRoles = () => {

    const [rolesString, setRolesString] = useState("");

    return (
        <form>
            <label>Edit Roles: </label>
            <input
                value={rolesString}
                onFocus={(e) => e.target.value = controller.frontendMobTimer.roles.join(",")}     
                onBlur={(e) => handleBlur(e)}                 
                onChange={(e) => setRolesString(e.target.value as string)}
                
                type="text"
                placeholder="Enter/Edit Roles"
            />
        </form>
    )

    function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>): void {
        const newValue = splitTrimAndRejoin(e.target.value as string);
        const oldValue = controller.frontendMobTimer.roles.join(",");
        // todo: replace window.confirm with a modal        
        return (newValue) !== oldValue
            && window.confirm("Update Roles from '"
                + oldValue.replaceAll(",", ", ")
                + "' to '"
                + newValue.replaceAll(",", ", ")
                + "'? (Click OK to confirm, or click Cancel to discard changes)")
            ? update(newValue, setRolesString)
            : setRolesString("");
    }

    function update(rolesString: string, setRolesString: React.Dispatch<React.SetStateAction<string>>) {
        controller.client?.editRoles(rolesString.split(",").map((name) => name.trim()));
        setRolesString("");
    }

    function splitAndTrim(string: string) {
        return string.split(",").map(x => x.trim());
    }

    function splitTrimAndRejoin(string: string) {
        return splitAndTrim(string).join(",");
    }
}



export default EditRoles