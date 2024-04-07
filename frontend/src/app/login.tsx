import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { PaperPage } from "../comp";

export function LoginRoutes() {
    return <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/logoff" element={<LogoffPage />} />
        <Route path="/signoff" element={<SignoffPage />} />
    </>
}

function LoginPage() {
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
    );
    async function login() {
        try {
            setLoggingIn(true);
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

function SigninPage() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [signingIn, setSigningIn] = useState(false);
    const navigate = useNavigate();

    return (
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
    );

    async function signin() {
        try {
            setSigningIn(true);
            if (password1 != password2) {
                alert("passwords do not match");
                return;
            }
            await createUserWithEmailAndPassword(auth, email, password1);
            alert("account created!\nnow login with your credentials");
            navigate("/login", { replace: true });
        } catch (error: any) {
            console.error(error.code, error.message);
            alert(`Signin error:\n${error.code}\n${error.message}`);
        } finally {
            setSigningIn(false);
        }
    }
};

function LogoffPage() {
    const [signingIn, setSigningIn] = useState(false);// TODO!
    const navigate = useNavigate();
    useEffect(() => {
        isLoggedIn().then(loggedIn => {
            if (!loggedIn) navigate("/login", { replace: true });
        });
    }, []);

    return (
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
                    >
                        Yes, Logoff
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
    );
    function logoff() {
        auth.signOut().then(() => navigate("/login"));
    }
}

function SignoffPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signingOff, setSigningOff] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        isLoggedIn().then(loggedIn => {
            if (!loggedIn) navigate("/login", { replace: true });
        });
    }, []);

    return (
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
    );
    async function signoff() {
        try {
            setSigningOff(true);
            await signInWithEmailAndPassword(auth, email, password);
            await deleteUser(auth.currentUser!);
            navigate("/login", { replace: true });
        } catch (error: any) {
            console.error(error.code, error.message);
            alert(`Signoff error:\n${error.code}\n${error.message}`);
        } finally {
            setSigningOff(false);
        }
    }
}

async function isLoggedIn(): Promise<boolean> {
    await auth.authStateReady();
    return !!auth.currentUser;
}
