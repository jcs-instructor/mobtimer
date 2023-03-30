import JoinMobForm from "./JoinMobForm";
import '../App.css';

const Launch = () => {
    return (
        <div>
            <div className="LaunchMain">
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
            <div className="LaunchBottom">
                <div>
                    <h1>
                        It works across all your devices
                    </h1>
                    <h1>
                        ... and more information to entice.
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Launch