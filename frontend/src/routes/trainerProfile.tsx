import React from "react";
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, StickyNote, MessageCircle,Layers, Flag, Calendar, LifeBuoy, Settings, MessagesSquare, Dumbbell, LogOut } from "lucide-react";
import { toast } from "react-toastify";

import Sidebar, { SidebarItem } from "../components/SideBar/Sidebar";
import ProtectedRoute from "../components/protectedRoute";
import { logout } from "../utils/login.ts";
import hola from "../assets/hola.png";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function logOutAction() {
	logout().catch(_ => toast("hubo un problema"));
}

export function TrainerProfile(){
return (
<>
	<ProtectedRoute kindsAllowed={["trainer"]} />
    <div className="flex bg-blue-50">
        <div>
            <Sidebar>
                <SidebarItem icon={<Home size={20} />} text="Inicio" link="/trainerProfile" />
                <SidebarItem icon={<Calendar size={20} />} text="Mi agenda" link="/calendarTrainer"/>
                <SidebarItem icon={<Layers size={20} />} text="Ensamblador de rutinas" link="/workouts"/>
                <SidebarItem icon={<MessagesSquare size={20} />} text="Mis Foros" />
                <SidebarItem icon={<MessageCircle size={20} />} text="Mis chats" link="messages"/>
                <hr className="my-20" />
                <SidebarItem icon={<Dumbbell size={20} />} text="Mi especialización" link="/specialty"/>
                <SidebarItem icon={<Settings size={20} />} text="Editar mi perfil" link="/editTrainerProfile"/>
                <SidebarItem icon={<LogOut size={20} />} text="Salir" onClick={logOutAction} />
            </Sidebar>
        </div>
        <div className="flex flex-col p-7 text-rose-700 font-semibold h-screen">
            <h1 className="text-5xl mb-4">¡Hola Entrenador! Mira como luce tu semana</h1>
            <div className="flex flex-row flex-1 p-6 bg-slate-300"> 
                <div className="w-1/3 flex-1 p-6 bg-cyan-700">
                    <h2 className="text-2xl text-blue-50 pb-6">Mira algunos de tus últimos mensajes</h2>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Mariel Hernández" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                            <ListItemText
                                primary="La rutina se ha sentido increíble"
                                secondary={
                                    <React.Fragment>
                                <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                >
                                Mariel Hernández
                            </Typography>
                            {" Gracias! Desde que comencé a entrenar contigo ..."}
                            </React.Fragment>
                                    }/>
                    </ListItem>
                        <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                    <ListItemText
                        primary="Hey coach, ¿Qué sigue?"
                        secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                                >
                            Tatiana Morales
                        </Typography>
                            {" Terminé la rutina, ¿qué sigue?'…"}
                        </React.Fragment>
                                    }/>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                        primary="No aguanto las piernas"
                        secondary={
                        <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary">
                            Constanza Larios
                    </Typography>
                        {' La rutina estuvo uff'}
                        </React.Fragment>}/>
                    </ListItem>
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                        primary="¿puedo reemplazar un ejercicio?"
                        secondary={
                        <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary">
                            Carlos González
                    </Typography>
                        {' No pude hacerlo, así que pensé en reemplazarlo...'}
                        </React.Fragment>}/>
                    </ListItem>
                    </List>
                </div>
            </div>
        </div>
        
    </div>
</>
);
}

export default TrainerProfile;
