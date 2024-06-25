import ReactDOM from "react-dom/client";
import App from "./UserScriptApp";

const root = document.createElement("div");
root.id = "cfe";
document.body.append(root);

ReactDOM.createRoot(root).render(<App />);
