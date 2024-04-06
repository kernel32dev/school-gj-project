import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { PaperPage } from "../comp";

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
                            onClick={handleLogin}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </PaperPage>
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
                            disabled={signingIn}
                            onClick={handleSignin}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </PaperPage>
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
                        onClick={home}
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
    function home() {
        navigate("/");
    }
}

async function isLoggedIn(): Promise<boolean> {
    await auth.authStateReady();
    return !!auth.currentUser;
}
