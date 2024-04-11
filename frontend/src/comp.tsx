import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';

export function Page({ children }: { children: JSX.Element | JSX.Element[] }) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            {children}
        </Box>
    );
}

export function PaperPage({ children }: { children: JSX.Element | JSX.Element[] }) {
    return (
        <Page>
            <Grid container spacing={0} justifyContent='center' direction='row'>
                <Grid item>
                    <Paper
                        variant='elevation'
                        elevation={2}
                        className='login-background'
                    >
                        <Box p={2}>{children}</Box>
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
}

export function InfoAlert({ infoState }: { infoState: [string, (value: "") => void] }) {
    const [lastMessage, setLastMessage] = useState("");
    const [message, clearMessage] = infoState;
    const onClose = () => clearMessage("");
    if (message && lastMessage != message) setLastMessage(message);
    return (
        <Dialog open={!!message} onClose={onClose} aria-labelledby="alert-dialog-title">
            <DialogContent>
                {message || lastMessage}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function ErrorAlert({ errorState }: { errorState: [string, (value: "") => void] }) {
    const [lastMessage, setLastMessage] = useState("");
    const [message, clearMessage] = errorState;
    const onClose = () => clearMessage("");
    if (message && lastMessage != message) setLastMessage(message);
    return (
        <Dialog open={!!message} onClose={onClose} aria-labelledby="alert-dialog-title">
            <DialogTitle id="alert-dialog-title">Error</DialogTitle>
            <DialogContent>
                <Alert severity="error">
                    {message || lastMessage}
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function ConfirmDialog({ prompState, onConfirm }: { prompState: [[string, string] | null, (value: null) => void], onConfirm: () => void }) {
    const [lastMessage, setLastMessage] = useState(["Are you sure you want to continue?", "Confirm"]);
    const [message, clearMessage] = prompState;
    const onClose = () => clearMessage(null);
    if (message && lastMessage != message) setLastMessage(message);
    return (
        <Dialog open={!!message} onClose={onClose} aria-labelledby="alert-dialog-title">
            <DialogTitle id="alert-dialog-title">Error</DialogTitle>
            <DialogContent>
                {message ? message[0] : lastMessage[0]}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onClose(); onConfirm(); }} color="primary" variant="contained" autoFocus>
                    {message ? message[1] : lastMessage[1]}
                </Button>
                <Button onClick={onClose} color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
