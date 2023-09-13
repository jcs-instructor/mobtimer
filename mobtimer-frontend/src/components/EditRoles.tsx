import React, { useState } from 'react';
import { Controller } from '../mobtimer-api/src';
const controller = Controller.staticController as Controller;

const EditRoles = () => {

    // const [rolesString, setRolesString] = useState(controller.frontendMobTimer.roles.join(","));
    const [rolesString, setRolesString] = useState("");
    
    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     update(rolesString, setRolesString);
    // }

    return (
        // <form onSubmit={(event) => onSubmit(event)}>
        <form>
            <label>Edit Roles: </label>
            <input
                // value={roles.join(",")}                                
                value={rolesString}
                //onChange={(e) => controller.setRoles((e.target.value as string).split(",").map((name) => name.trim()))}
                //onChange={(e) => controller.client?.editRoles((e.target.value as string).split(",").map((name) => name.trim()))}                                
                //onChange={(e) => setRolesString(e.target.value as string)}
                onFocus={(e) => e.target.value = controller.frontendMobTimer.roles.join(",")}     
                // onBlur={(e) => update(e.target.value, setRolesString)}                    
                onBlur={(e) => handleBlur(e)}                 
                onChange={(e) => setRolesString(e.target.value as string)}
                
                type="text"
                placeholder="Enter/Edit Roles"
            />
            {/* <button type="submit">👥 Update</button> */}
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