import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIn().then(loggedIn => {
            if (!loggedIn) navigate("/login", { replace: true });
        });
    }, []);

    return (
        <div className="screen-page flex-center">
            <div>
                <h1>Login</h1>
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
                <button onClick={handleLogin} disabled={loggingIn}>Login</button>
                <br />
                <br />
                <Link to="/signin">Don"t have an account?<br />Try creating one!</Link>
            </div>
        </div>
    );
    async function handleLogin() {
        setLoggingIn(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/", { replace: true });
        } catch (error: any) {
            console.error(error.code, error.message);
            alert(`Login error:\n${error.code}\n${error.message}`);
        } finally {
            setLoggingIn(false);
        }
    }
};

export function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signingIn, setSigningIn] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="screen-page flex-center">
            <div>
                <h1>Signin</h1>
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
                <button onClick={handleSignin} disabled={signingIn}>Signin</button>
                <br />
                <br />
                <Link to="/login">Already have an account?<br />Try using it!</Link>
            </div>
        </div>
    );

    async function handleSignin() {
        setSigningIn(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/login", { replace: true });
        } catch (error: any) {
            console.error(error.code, error.message);
            alert(`Signin error:\n${error.code}\n${error.message}`);
        } finally {
            setSigningIn(false);
        }
    }
};

export function LogoffPage() {
    const navigate = useNavigate();
    useEffect(() => {
        isLoggedIn().then(loggedIn => {
            if (!loggedIn) navigate("/login", { replace: true });
        });
    }, []);

    return (
        <div className="screen-page flex-center">
            <div>
                <h4>Are you sure you want to logoff?</h4>
                <br />
                <button onClick={logoff}>Yes, Logoff</button>
                {"\u{A0}"}
                <button onClick={home}>No, return to home page</button>
            </div>
        </div>
    );
    function logoff() {
        auth.signOut().then(() => navigate("/login"));
    }
    function home() {
        navigate("/");
    }
}

async function isLoggedIn(): Promise<boolean> {
    await auth.authStateReady();
    return !!auth.currentUser;
}
