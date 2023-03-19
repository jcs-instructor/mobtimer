import { Link } from "react-router-dom";
import JoinMobForm from "./JoinMobForm";
import './Launch.css';

const Launch = () => {
    return (
        <div className="LaunchStyle">
            <h1>A collaborative timer</h1>
            <h2>for your mob team</h2>
            <JoinMobForm />
            <p><a href="https://www.google.com/search?q=mob+programming" rel="noreferrer">
                Learn more about mob programming
            </a>
            </p>
            <img style={{ width: "285px", height: "384px", bottom: "-65px", right: "377px", display: "block", position: "absolute" }} src="./images/womansitting.svg" alt="" />
            <img style={{ width: "285px", height: "384px", bottom: "65px", right: "80px", display: "block", position: "absolute" }} src="./images/mansitting.svg" alt="" />

        </div>
    )
}

export default Launch