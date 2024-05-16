import React from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";
import { toast } from 'react-toastify';

import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import { SidebarAthlete } from "../components/SideBar/SidebarAthlete.tsx";
import ProtectedRoute from "../components/protectedRoute";
import SearchBar from "../components/profiles/SearchBar";
import SearchTrainers from "../components/profiles/SearchTrainers";
import { logout } from "../utils/login.ts";
import RequestTrainer from "./requestTrainer.tsx";

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export function UserProfile(){
return (
<>
	<ProtectedRoute kindsAllowed={["athlete"]} />
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-200 to-blue-50">
  <ProtectedRoute kindsAllowed={["athlete"]} />
  <div className="flex flex-grow">
    <SidebarAthlete />
    <div className="flex flex-col justify-center items-center flex-grow">
      <h1 className="text-5xl font-bold text-blue-900 mb-8">
        Todo comienza encontrando a tu entrenador
      </h1>
      <RequestTrainer />

    </div>
  </div>
</div>
</>
);
}

export default UserProfile;
