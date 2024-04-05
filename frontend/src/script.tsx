import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("root")!;
    const root = createRoot(container);
    root.render(<App />);
});
