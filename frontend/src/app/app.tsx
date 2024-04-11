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
import { Crud, CrudProps } from "./crud";

type AppDrawerItem = { caption: string, to: string } | "-";

export function App() {
    const drawerWidth = 240;
    const drawerItems: AppDrawerItem[] = [
        { caption: "Home", to: "/" },
        "-",
        { caption: "Guardians", to: "/guardian" },
        { caption: "Students", to: "/student" },
        { caption: "Courses", to: "/course" },
        { caption: "Grades", to: "/grade" },
        { caption: "Classes", to: "/class" },
        "-",
        { caption: "Logoff", to: "/logoff" },
        { caption: "Signoff", to: "/signoff" },
    ];
    const guardian: CrudProps<db.Guardian> = {
        path: "guardian",
        title: "Guardians",
        list: () => backend({ api: "ListGuardian" }),
        upsert: (row) => backend({ api: "UpsertGuardian", row }),
        delete: (ids) => backend({ api: "DeleteGuardian", ids }),
        columns: [
            { field: 'id', headerName: 'ID', width: 70, crudType: 'id', crudEnabled: false },
            { field: 'name', headerName: 'Name', width: 230, crudType: 'string' },
            { field: 'created_dth', headerName: 'Created', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
            { field: 'updated_dth', headerName: 'Updated', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
        ]
    };
    const student: CrudProps<db.Student> = {
        path: "student",
        title: "Students",
        list: () => backend({ api: "ListStudent" }),
        upsert: (row) => backend({ api: "UpsertStudent", row }),
        delete: (ids) => backend({ api: "DeleteStudent", ids }),
        columns: [
            { field: 'id', headerName: 'ID', width: 70, crudType: 'id', crudEnabled: false },
            { field: 'name', headerName: 'Name', width: 230, crudType: 'string' },
            { field: 'birth_dt', headerName: 'Birth Date', width: 230, crudType: 'string' },
            { field: 'guardian_id', headerName: 'Guardian', width: 230, crudType: 'number' },
            { field: 'created_dth', headerName: 'Created', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
            { field: 'updated_dth', headerName: 'Updated', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
        ]
    };
    const course: CrudProps<db.Course> = {
        path: "course",
        title: "Courses",
        list: () => backend({ api: "ListCourse" }),
        upsert: (row) => backend({ api: "UpsertCourse", row }),
        delete: (ids) => backend({ api: "DeleteCourse", ids }),
        columns: [
            { field: 'id', headerName: 'ID', width: 70, crudType: 'id', crudEnabled: false },
            { field: 'name', headerName: 'Name', width: 230, crudType: 'string' },
            { field: 'acronym', headerName: 'Name', width: 230, crudType: 'string' },
            { field: 'created_dth', headerName: 'Created', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
            { field: 'updated_dth', headerName: 'Updated', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
        ]
    };
    const grade: CrudProps<db.Grade> = {
        path: "grade",
        title: "Grades",
        list: () => backend({ api: "ListGrade" }),
        upsert: (row) => backend({ api: "UpsertGrade", row }),
        delete: (ids) => backend({ api: "DeleteGrade", ids }),
        columns: [
            { field: 'id', headerName: 'ID', width: 70, crudType: 'id', crudEnabled: false },
            { field: 'name', headerName: 'Name', width: 230, crudType: 'string' },
            { field: 'acronym', headerName: 'Name', width: 230, crudType: 'string' },
            { field: 'course_id', headerName: 'Course', width: 230, crudType: 'number' },
            { field: 'next_grade_id', headerName: 'Next Grade', width: 230, crudType: 'number' },
            { field: 'created_dth', headerName: 'Created', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
            { field: 'updated_dth', headerName: 'Updated', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
        ]
    };
    const class_: CrudProps<db.Class> = {
        path: "class",
        title: "Classes",
        list: () => backend({ api: "ListClass" }),
        upsert: (row) => backend({ api: "UpsertClass", row }),
        delete: (ids) => backend({ api: "DeleteClass", ids }),
        columns: [
            { field: 'id', headerName: 'ID', width: 70, crudType: 'id', crudEnabled: false },
            { field: 'name', headerName: 'Name', width: 230, crudType: 'string' },
            { field: 'letter', headerName: 'Name', width: 230, crudType: 'string' },
            { field: 'grade_id', headerName: 'Grade', width: 230, crudType: 'number' },
            { field: 'year', headerName: 'Year', width: 230, crudType: 'number' },
            { field: 'created_dth', headerName: 'Created', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
            { field: 'updated_dth', headerName: 'Updated', width: 200, crudVisible: false, cellClassName: "crud-cell-dim" },
        ]
    };
    return (
        <Routes>
            <Route path="/404" element={<NotFoundPage />} />
            {LoginRoutes()}
            <Route path="/*" element={<HomePage drawerItems={drawerItems} drawerWidth={drawerWidth} />}>
                <Route path="" element={<HomeContent />} />
                <Route path="guardian" element={<Crud {...guardian} />} />
                <Route path="student" element={<Crud {...student} />} />
                <Route path="course" element={<Crud {...course} />} />
                <Route path="grade" element={<Crud {...grade} />} />
                <Route path="class" element={<Crud {...class_} />} />
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

function HomeContent() {
    return <>
        <Typography component="h1" variant="h4">
            school-gj
        </Typography>
        <Divider />
        <Typography>
            <br />
            An example CRUD project using react, material UI, node and typescript, hosted on firebase
        </Typography>
    </>;
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
