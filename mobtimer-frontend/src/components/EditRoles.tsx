import React from 'react';
import { Controller } from '../controller/controller';

type FormParameters = {
    rolesString: string;
}

const EditRoles = ({ rolesString }: FormParameters) => {

    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     Controller.client.editRoles(rolesString.split(",").map((name) => name.trim()));
    // }

    return (
        // <form onSubmit={(event) => onSubmit(event)}>
        <form>
            <label>Edit Roles: </label>
            <input
                // value={roles.join(",")}                                
                value={rolesString}
                //onChange={(e) => Controller.setRoles((e.target.value as string).split(",").map((name) => name.trim()))}
                onChange={(e) => Controller.client.editRoles((e.target.value as string).split(",").map((name) => name.trim()))}                                
                //onChange={(e) => setRolesString(e.target.value as string)}
                type="text"
                placeholder="Enter roles"
            />
            {/* <button type="submit">👥 Update</button> */}
        </form>
    )
}

export default EditRoles