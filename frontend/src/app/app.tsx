import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate, Outlet, Navigate, useLocation } from "react-router-dom";
import { auth, backend } from "../firebase";
import { LoginRoutes } from "./login";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { CrudRoute } from "./crud";

type AppDrawerItem = { caption: string, to: string } | "-";

export function App() {
    const drawerWidth = 240;
    const drawerItems: AppDrawerItem[] = [
        { caption: "Home", to: "/" },
        { caption: "Guardian", to: "/guardian" },
        "-",
        { caption: "Logoff", to: "/logoff" },
        { caption: "Signoff", to: "/signoff" },
    ];
    return (
        <Routes>
            <Route path="/404" element={<NotFoundPage />} />
            {LoginRoutes()}
            <Route path="/*" element={<HomePage drawerItems={drawerItems} drawerWidth={drawerWidth} />}>
                <Route path="" element={<Typography>TODO! Home content</Typography>} />
                {CrudRoute({
                    path: "guardian",
                    title: "Guardians",
                    list: () => backend({ api: "ListGuardian" }),
                    columns: [
                        { field: 'id', headerName: 'ID', width: 70, crudType: 'id', crudEnabled: false },
                        { field: 'name', headerName: 'Name', width: 230, crudType: 'string' },
                        { field: 'created_dth', headerName: 'Created', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
                        { field: 'updated_dth', headerName: 'Updated', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
                    ]
                })}
                <Route path="*" element={<Navigate to="/404" />} />
            </Route>
        </Routes>
    );
}

export function HomePage(props: { drawerItems: AppDrawerItem[], drawerWidth: number }) {
    const { drawerItems, drawerWidth } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation().pathname;

    useEffect(() => {
        isLoggedIn().then(loggedIn => {
            if (!loggedIn) navigate("/login", { replace: true });
        });
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(x => !x);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                school-gj
            </Typography>
            <Divider />
            <List>
                {drawerItems.map((x, i) => x === "-" ? <Divider key={i} /> : (
                    <ListItem key={i} disablePadding>
                        <ListItemButton
                            selected={x.to == location}
                            sx={{ textAlign: 'center' }}
                            onClick={() => navigate(x.to)}
                        >
                            <ListItemText primary={x.caption} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    const main = <>
        <Toolbar />
        <Outlet />
    </>;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h5" variant="h5">
                        school-gj
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <PersonIcon />
                    <Typography component="h6" variant="h6">
                        {get_user_name()}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={document.getElementById("root")}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                {main}
            </Box>
        </Box>
    );
}

function get_user_name() {
    if (!auth.currentUser) return "User";
    const user = auth.currentUser;
    if (user.displayName) return user.displayName;
    if (user.email) {
        const at = user.email.indexOf("@");
        if (at == -1) return user.email;
        return user.email.substring(0, at);
    }
    return "User";
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
