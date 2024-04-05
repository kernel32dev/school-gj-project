import { useState, JSX } from "react";
import css from "../css";

export function App(): JSX.Element {
    const [counter, setCounter] = useState(0);
    return (
        <div className="app-container">
            <div className="app-card">
                <h1>React is working!</h1>
                <hr />
                <br />
                <p>The value of counter is {counter}</p>
                <br />
                <button onClick={() => setCounter(counter + 1)}>increment counter</button>
            </div>
        </div>
    )
}

css`

.app-container {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.app-card {
    text-align: center;
}

`
