import React from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";
import { toast } from 'react-toastify';

import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import { SidebarAthlete } from "../components/SideBar/SidebarAthlete.tsx";
import ProtectedRoute from "../components/protectedRoute";
import BodyMeasurementsDisplay from "../components/profiles/BodyMeasurementsDisplay";
import SearchBar from "../components/profiles/SearchBar";
import SearchTrainers from "../components/profiles/SearchTrainers";
import { logout } from "../utils/login.ts";
import RequestTrainer from "./requestTrainer.tsx";
import RequestsForAthletes from "../components/profiles/RequestsForAthletes.tsx";

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export function UserProfile(){
return (
<>
	<ProtectedRoute kindsAllowed={["athlete"]} />
    <div className="flex bg-blue-50">
        <div>
            <SidebarAthlete/>
        </div>
        <div className="p-7 text-2xl font-semibold grid grid-cols-3 gap-6 h-screen">
            <div>
                <h1>¡Hola! Mira cómo luce tu semana</h1>
                <BodyMeasurementsDisplay />
            </div>
            <div>
                <RequestsForAthletes />
            </div>
            <div className="mt-8">
                <RequestTrainer />
            </div>
        </div>
        
    </div>
</>
);
}

export default UserProfile;
