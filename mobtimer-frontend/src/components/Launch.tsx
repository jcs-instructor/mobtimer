import JoinMobForm from "./JoinMobForm";
import '../App.css';

const Launch = () => {
    return (
        <div>
            <div className="LaunchTop">
                <div className="LaunchMain">
                    <h1>A collaborative timer </h1>
                    <h2>for your team</h2>
                    <JoinMobForm />
                    <p><a href="https://www.agilealliance.org/glossary/mob-programming/" rel="noreferrer">Learn more about mob programming</a></p>
                </div>
                <img style={{ height: "285px" }} src="./images/mobrotation.svg" alt="" />
            </div>
            <div className="LaunchBottom">
                <div>
                    <h1>
                        The Story Behind This Product
                    </h1>
                    <p>
                        We (Joel Silberman and Ethan Strominger) enjoy coding together because we both like to strive to create clean code that
                        is easy to understand, enhance, and maintain - while staying open to continuous learning and improvement.
                    </p>
                    <p>We also could not find a mob timer with all the features we were looking for, so we decided to build one from scratch and to
                        do it using pair programming.
                    </p>
                    <p>
                        (Technical Details for Developers TLDR: The front end was built using React and Typescript. We chose React because it has a large user 
                        base and frequent updates so it will be well supported, and we will have a larger developer base who might some day want to develop/extend what we've 
                        started, which we hope to encourage and support in the future! The back end was built using Node.js, Express, and TypeScript to enable sharing of code between the front and 
                        back ends.)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Launch