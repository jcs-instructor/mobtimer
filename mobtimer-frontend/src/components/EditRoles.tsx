import React, { useState } from 'react';
import { Controller } from '../controller/controller';

const EditRoles = () => {

    // const [rolesString, setRolesString] = useState(Controller._roles.join(","));
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
                //onChange={(e) => Controller.setRoles((e.target.value as string).split(",").map((name) => name.trim()))}
                //onChange={(e) => Controller.client.editRoles((e.target.value as string).split(",").map((name) => name.trim()))}                                
                //onChange={(e) => setRolesString(e.target.value as string)}
                onFocus={(e) => e.target.value = Controller._roles.join(",")}     
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
        const oldValue = Controller._roles.join(",");
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
        Controller.client.editRoles(rolesString.split(",").map((name) => name.trim()));
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