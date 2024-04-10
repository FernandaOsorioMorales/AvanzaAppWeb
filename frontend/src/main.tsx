import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
// Redux state
import { Provider as ReduxProvider } from "react-redux";
import store from './store'

import { Root } from './routes/root';
import { Messages } from "./routes/messages";
import { Assembler } from "./routes/assembler";
import LoginForm from "./routes/login";
import RegisterForm from "./routes/register";
import Err404 from "./routes/Err404"
import TrainerProfile from "./routes/trainerProfile"
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/index.css';

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
    element: <LoginForm title="Que gusto verte de nuevo" registerLinkText="¿Aún no te unes? Regístrate aquí" />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/routines",
    element: <Assembler />,
  },
  {
    path: "/trainerProfile",
    element: <TrainerProfile />,
  },
  {
    path: "/*",
    element: <Err404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ReduxProvider>
);