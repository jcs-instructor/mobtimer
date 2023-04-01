import JoinMobForm from "./JoinMobForm";
import '../App.css';

const Launch = () => {
    return (
        <div>
            <div className="LaunchTop">
                <div className="LaunchMain">
                    <h1>A collaborative timer</h1>
                    <h2>for your mob team</h2>
                    <JoinMobForm />
                    <p><a href="https://www.google.com/search?q=mob+programming" rel="noreferrer">
                        Learn more about mob programming!
                    </a>
                    </p>
                </div>
                <img style={{ height: "285px" }} src="./images/mobrotation.svg" alt="" />
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