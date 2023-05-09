import "../App.css"
type FormParameters = {
    participants: string[];
    roles: string[];
}

const Participants = ({ participants, roles }: FormParameters) => {

    const defaultRole = "";

    return (
        <div style={{ display: "block" }}>
            <label>Participants: </label>
            {participants.map((participant, i) =>
                <div key={i} className="ParticipantRow">
                    <div className="CellBox ParticipantBorder">{participant}</div>
                    <div className="CellBox">{roles[i] || defaultRole}</div>
                </div>)}
        </div>
    )
}

export default Participants