import { useState, JSX } from "react";
import { Navigate, Route, Routes, Link } from 'react-router-dom';

export function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logoff" element={<Logoff />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

function Login() {
    return <>
        <h2>Login</h2>
        <Link to="/menu">Go to menu</Link>
    </>;
}

function Logoff() {
    return <h2>Logoff</h2>;
}

function Menu() {
    const [counter, setCounter] = useState(0);
    return (
        <div className="screen-page flex-center">
            <div className="text-center">
                <h1>React is working!</h1>
                <hr />
                <br />
                <p>The value of counter is {counter}</p>
                <br />
                <button onClick={() => setCounter(counter + 1)}>increment counter</button>
                <br />
                <br />
                <nav>
                    <Link to="/login">Login</Link>
                    <br />
                    <Link to="/logoff">Logoff</Link>
                    <br />
                    <Link to="/menu">Menu</Link>
                </nav>
            </div>
        </div>
    );
}

function NotFound() {
    return <h2>404 - Page Not Found</h2>;
}
