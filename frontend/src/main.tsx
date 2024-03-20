import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './styles/index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from './routes/root';
import { Messages } from "./routes/messages";
import LoginForm from "./routes/login";
import RegisterForm from "./routes/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/login",
    element: <LoginForm title="Log in" registerLinkText="¿No tienes cuenta? Regístrate aquí" />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  }

]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);