import { Box, Grid, Paper } from "@mui/material";

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