import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './styles/index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from './routes/root.tsx';
import { Messages } from "./routes/messages.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/messages",
    element: <Messages />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);