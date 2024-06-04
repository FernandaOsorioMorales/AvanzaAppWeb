import React from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";
import { toast } from "react-toastify";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


import ProtectedRoute from "../components/protectedRoute";
import RequestsForTrainers from "../components/profiles/RequestsForTrainers";
import { logout } from "../utils/login.ts";
import { SidebarTrainer } from "../components/SideBar/SidebarTrainer.tsx";

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export function TrainerProfile(){
return (
<>
	<ProtectedRoute kindsAllowed={["trainer"]} />
		<div className="flex bg-blue-50 min-h-screen">
			<div>
				<SidebarTrainer />
			</div>
			<div className="flex flex-col p-7 text-rose-700 font-semibold flex-1">
				<h1 className="text-5xl mb-4 text-center">¡Hola! Ve quién te ha solicitado como entrenador</h1>
				<div className="flex flex-col justify-center items-center flex-1 p-6 bg-slate-300 rounded-lg shadow-lg">
					{/* Contenedor RequestsForTrainers centrado */}
					<div className="bg-slate-300 p-4 rounded-lg shadow-lg w-full max-w-3xl">
						<RequestsForTrainers />
					</div>
				</div>
			</div>
		</div>
</>
);
}

export default TrainerProfile;
