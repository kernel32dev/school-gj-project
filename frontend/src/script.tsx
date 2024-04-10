import { createRoot } from "react-dom/client";
import { App } from "./app/app";
import { BrowserRouter } from "react-router-dom";
import { auth } from "./firebase";
import "./style.css";

/** start settling the auth state before DOM loads */
const authStateReady = auth.authStateReady();

document.addEventListener("DOMContentLoaded", async () => {
    /** load the app only when auth is settled */
    try {
        await authStateReady;
    } catch (error) {
        // prevent errors from stopping the creation of the app
        console.error(error);
    }

    const container = document.getElementById("root")!;
    const root = createRoot(container);
    root.render(<BrowserRouter><App /></BrowserRouter>);
});
