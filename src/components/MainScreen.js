import Button from "./Button";

export default function MainScreen(props) {

    const levelText = ["Easy", "Medium", "Hard"];

    return (
        <div className="mainscreen text-center">
            <h1 className="mainscreen--title">Memory game</h1>
            <div className="mainscreen--menu">
                <p>Select level</p>
                <Button label={levelText[props.level]} action={props.changeDifficulty} />
                <br />
                <Button label="Start" action={() => props.setStart(1)} />
                <p>Made with React <span className="logo-react"><i className="fab fa-react"></i></span></p>
            </div>
        </div>
    );
}