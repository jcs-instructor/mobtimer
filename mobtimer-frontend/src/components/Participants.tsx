import "../App.css"
type FormParameters = {
    participants: string[];
}

const Participants = ({ participants }: FormParameters) => {

    const rolesArray = ["🗣️ Navigator", "🛞 Driver"];
    const defaultRole = "";

    return (
        <div style={{ display: "block" }}>
            <label>Participants: </label>
            {participants.map((participant, i) =>
                <div key={i} className="ParticipantRow">
                    <div className="CellBox ParticipantBorder">{participant}</div>
                    <div className="CellBox">{rolesArray[i] || defaultRole}</div>
                </div>)}
        </div>
    )
}

export default Participants