import axios from "axios";
import React from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";
import { toast } from 'react-toastify';

import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import ProtectedRoute from "../components/protectedRoute";
import BodyMeasurementsDisplay from "../components/profiles/BodyMeasurementsDisplay";
import SearchBar from "../components/profiles/SearchBar";
import SearchTrainers from "../components/profiles/SearchTrainers";
import RequestsForAthletes from "../components/profiles/RequestsForAthletes";
import { logout } from "../utils/login.ts";

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export function RequestTrainer(){
return (
<>
	<ProtectedRoute kindsAllowed={["athlete"]} />
    <div >
		<div >
			<div >
					<div className="flex flex-col flex-1 p-6"> 
						
						<SearchTrainers /> 
					</div>
			</div>
		</div>
        
    </div>

</>
);
}

export default RequestTrainer;
