import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </HashRouter>
);
