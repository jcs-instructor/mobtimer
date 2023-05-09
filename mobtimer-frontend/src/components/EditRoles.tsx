import React from 'react';
import { Controller } from '../controller/controller';

type FormParameters = {
    roles: string[];
}

const EditRoles = ({ roles }: FormParameters) => {

    return (
        <form>
            <label>Edit Roles: </label>
            <input
                value={roles.join(",")}                
                onChange={(e) => Controller.client.editRoles((e.target.value as string).split(",").map((name) => name.trim()))}
                type="text"
                placeholder="Enter particpants names"
            />
            {/* <button type="submit">👥 Update</button> */}
        </form>
    )
}

export default EditRoles