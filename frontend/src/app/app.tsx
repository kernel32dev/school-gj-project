import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { LoginPage, LogoffPage, SigninPage } from "./login";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/logoff" element={<LogoffPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

function HomePage() {
    const [counter, setCounter] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        isLoggedIn().then(loggedIn => {
            if (!loggedIn) navigate("/login", { replace: true });
        });
    }, []);
    return (
        <div className="screen-page flex-center">
            <div className="text-center">
                <h1>You are logged in!</h1>
                <hr />
                <br />
                <p>The value of counter is {counter}</p>
                <br />
                <button onClick={() => setCounter(counter + 1)}>increment counter</button>
                <br />
                <br />
                <nav>
                    <Link to="/logoff">Logoff</Link>
                </nav>
            </div>
        </div>
    );
}

function NotFoundPage() {
    return (
        <div className="screen-page flex-center">
            <div className="text-center">
                <h1>404</h1>
                <h2>What you are looking for is not here!</h2>
                <br />
                If you are lost, maybe you could go back <Link to="/">home</Link>!
            </div>
        </div>
    );
}

async function isLoggedIn(): Promise<boolean> {
    await auth.authStateReady();
    return !!auth.currentUser;
}
