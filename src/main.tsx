import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import TodosContextProvider from "./contexts/TodosContextProvider.tsx";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KindeProvider
      clientId="04159477b65240fc8fa54fdda500acc2"
      domain="https://primesite.kinde.com"
      redirectUri={
        process.env.NODE_ENV === "production"
          ? "https://react-todo-ten-gray.vercel.app/"
          : "http://localhost:5173"
      }
      logoutUri={
        process.env.NODE_ENV === "production"
          ? "https://react-todo-ten-gray.vercel.app/"
          : "http://localhost:5173"
      }
      isDangerouslyUseLocalStorage={true}
    >
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </KindeProvider>
  </React.StrictMode>
);
