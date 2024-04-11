import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ErrorAlert, InfoAlert, PaperPage } from "../comp";

export function LoginRoutes() {
    return <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/logoff" element={<LogoffPage />} />
        <Route path="/signoff" element={<SignoffPage />} />
    </>
}

function LoginPage() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const navigate = useNavigate();

    return <>
        <PaperPage>
            <form>
                <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <Typography component='h1' variant='h5'>
                            Login
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            type='email'
                            placeholder='Email'
                            fullWidth
                            name='email'
                            variant='outlined'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            autoFocus
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type='password'
                            placeholder='Password'
                            fullWidth
                            name='password'
                            variant='outlined'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item alignSelf='center'>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            className='button-block'
                            disabled={loggingIn}
                            onClick={login}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item alignSelf='center'>
                        <Button
                            className='button-block'
                            onClick={() => navigate("/signin", {replace: true})}
                        >
                            Create account
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </PaperPage>
        <ErrorAlert errorState={[error, setError]} />
    </>;

    async function login() {
        try {
            if (email == "") return;
            if (password == "") return;
            setLoggingIn(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/", { replace: true });
        } catch (error) {
            setError(formatError(error));
        } finally {
            setLoggingIn(false);
        }
    }
};

function SigninPage() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [signingIn, setSigningIn] = useState(false);
    const navigate = useNavigate();

    return <>
        <PaperPage>
            <form>
                <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <Typography component='h1' variant='h5'>
                            Signin
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            type='email'
                            placeholder='Email'
                            fullWidth
                            name='email'
                            variant='outlined'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            autoFocus
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type='password'
                            placeholder='Password'
                            fullWidth
                            name='password1'
                            variant='outlined'
                            value={password1}
                            onChange={(event) => setPassword1(event.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type='password'
                            placeholder='Repeat password'
                            fullWidth
                            name='password2'
                            variant='outlined'
                            value={password2}
                            onChange={(event) => setPassword2(event.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item alignSelf='center'>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            className='button-block'
                            disabled={signingIn}
                            onClick={signin}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item alignSelf='center'>
                        <Button
                            className='button-block'
                            onClick={() => navigate("/login", {replace: true})}
                        >
                            Use an existing account
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </PaperPage>
        <ErrorAlert errorState={[error, setError]} />
        <InfoAlert infoState={[success ? "Account created!\nNow login with your credentials" : "", dismissSuccessAndRedirect]} />
    </>;

    async function signin() {
        try {
            if (email == "") return;
            if (password1 == "") return;
            if (password2 == "") return;
            setSigningIn(true);
            if (password1 != password2) {
                return setError("Passwords do not match");
            }
            await createUserWithEmailAndPassword(auth, email, password1);
            setSuccess(true);
        } catch (error) {
            setError(formatError(error));
        } finally {
            setSigningIn(false);
        }
    }
    function dismissSuccessAndRedirect() {
        setSuccess(false);
        navigate("/login", { replace: true });
    }
};

function LogoffPage() {
    const [error, setError] = useState("");
    const [signingIn, setSigningIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        isLoggedIn().then(loggedIn => {
            if (!loggedIn) navigate("/login", { replace: true });
        });
    }, []);

    return <>
        <PaperPage>
            <Grid container spacing={2} alignItems='center' direction='column'>
                <Grid item>
                    <Typography component='h1' variant='h5'>
                        Are you sure you want to logoff?
                    </Typography>
                </Grid>
                <Grid item alignSelf='center'>
                    <Button
                        variant='contained'
                        color='primary'
                        className='button-block'
                        onClick={logoff}
                        disabled={signingIn}
                    >
                        Yes, Logoff
                    </Button>
                </Grid>
                <Grid item alignSelf='center'>
                    <Button
                        className='button-block'
                        onClick={() => navigate("/")}
                        disabled={signingIn}
                    >
                        No, return to home page
                    </Button>
                </Grid>
            </Grid>
        </PaperPage>
        <ErrorAlert errorState={[error, setError]} />
    </>;

    async function logoff() {
        try {
            setSigningIn(true);
            await auth.signOut();
            navigate("/login");
        } finally {
            setSigningIn(false);
        }
    }
}

function SignoffPage() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signingOff, setSigningOff] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        isLoggedIn().then(loggedIn => {
            if (!loggedIn) navigate("/login", { replace: true });
        });
    }, []);

    return <>
        <PaperPage>
            <Grid container spacing={2} alignItems='center' direction='column'>
                <Grid item>
                    <Typography component='h4' variant='h5'>
                        Login to delete your account
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        type='email'
                        placeholder='Email'
                        fullWidth
                        name='email'
                        variant='outlined'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        autoFocus
                        autoComplete="username"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type='password'
                        placeholder='Password'
                        fullWidth
                        name='password'
                        variant='outlined'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </Grid>
                <Grid item alignSelf='center'>
                    <Button
                        variant='contained'
                        color='warning'
                        className='button-block'
                        onClick={signoff}
                        disabled={signingOff || !email || !password}
                    >
                        Yes, delete my account
                    </Button>
                </Grid>
                <Grid item alignSelf='center'>
                    <Button
                        className='button-block'
                        onClick={() => navigate("/")}
                    >
                        No, return to home page
                    </Button>
                </Grid>
            </Grid>
        </PaperPage>
        <ErrorAlert errorState={[error, setError]} />
    </>;

    async function signoff() {
        try {
            setSigningOff(true);
            await signInWithEmailAndPassword(auth, email, password);
            await deleteUser(auth.currentUser!);
            navigate("/login", { replace: true });
        } catch (error) {
            setError(formatError(error));
        } finally {
            setSigningOff(false);
        }
    }
}

async function isLoggedIn(): Promise<boolean> {
    await auth.authStateReady();
    return !!auth.currentUser;
}

function formatError(error: any): string {
    // TODO! format errors
    return `Firebase: ${error.code} ${error.message}`;
}
