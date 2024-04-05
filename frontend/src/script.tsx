import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import { BrowserRouter } from 'react-router-dom';
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("root")!;
    const root = createRoot(container);
    root.render(<BrowserRouter><App /></BrowserRouter>);
});
