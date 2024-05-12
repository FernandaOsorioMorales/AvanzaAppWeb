import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

// Redux state
import { Provider as ReduxProvider } from "react-redux";
import store from './state/store'

// Toast errors
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';//GL

// Routes
import { Root } from './routes/root';
import { Messages } from "./routes/messages";
import { Assembler } from "./routes/assembler";
import LoginForm from "./routes/login";
import EditTrainerProfile from "./routes/editTrainerProfile";

import Err404 from "./routes/Err404"
import TrainerProfile from "./routes/trainerProfile"
import { FollowAlong } from "./routes/followAlong";
import RegisterUser from "./routes/registerUser";
import RequestTrainer from "./routes/requestTrainer";
import UserProfile from "./routes/userProfile";

import './styles/index.css';
import RegisterClasification from "./routes/registerClasification";
import RegisterTrainer from "./routes/registerTrainer";
import CalendarTrainer from "./routes/calendarTrainer";
import CalendarUser from "./routes/calendarUser";
import Specialty from "./routes/specialty";


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
    element: <LoginForm title="¡Que gusto verte de nuevo!" registerLinkText="¿Aún no te unes? Regístrate aquí" />,
  },
  {
    path: "/registerUser",
    element: <RegisterUser />,
  },
  {
    path: "/workouts",
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
  { 
    path: "/editTrainerProfile", 
    element: <EditTrainerProfile /> },
    {
      path:"/registerClasification",
      element: <RegisterClasification />,
    },
    {
      path:"/registerTrainer",
      element: <RegisterTrainer />,
    },
    {
      path:"/userProfile",
      element: <UserProfile />,
    },
    {
      path:"/requestTrainer",
      element: <RequestTrainer />,
    },
  {
    path: "/followAlong",
    element: <FollowAlong/>,
  },
  {
    path: "/calendarTrainer",
    element: <CalendarTrainer />,
  },
  {
    path: "/calendarUser",
    element: <CalendarUser />,
  },
  {
    path:"/specialty",
    element:<Specialty />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
  	<ToastContainer />
    <RouterProvider router={router} />
  </ReduxProvider>
);

