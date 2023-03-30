import "../App.css"
type FormParameters = {
    participants: string[];
}

const Participants = ({ participants }: FormParameters) => {

    const roles = "Navigator,Driver";
    const rolesArray = ["Navigator", "Driver"];
    const defaultRole = "Team Member";

    return (
        <div style={{ display: "block" }}>
            <label>Participants ({roles}): </label>
            {participants.map((participant, i) =>
                <div className="ParticipantRow">
                    <div key={participant} className="CellBox ParticipantBorder">{participant}</div>
                    <div className="CellBox">{rolesArray[i] || defaultRole}</div></div>)}
        </div>
    )
}

export default Participants