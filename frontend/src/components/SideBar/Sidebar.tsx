import React, {createContext, ReactNode} from "react";
import {ChevronFirst, ChevronLast, Currency, MoreVertical} from "lucide-react";
import { useRef, useContext, MouseEvent } from 'react';

import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";

interface SidebarProps {
    children: React.ReactNode;

}
interface SidebarItemProps {
    icon: JSX.Element;
    text: string;
    active?: boolean;
    alert?: boolean;
    link?: string;
    onClick?: () => void;
}
interface SidebarContextType {
    expanded: boolean;

}

const SidebarContext = createContext<SidebarContextType>({ expanded: false });

export default function Sidebar({children}: SidebarProps) {
    const [expanded, setAExpanded] = React.useState(false);

    return(
        <>
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-blue-100 rounded-lg shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}/>
                        <button onClick={()=>setAExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>

                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

               
            </nav>
        </aside>
        </>   
    );
}

export function SidebarItem({ icon, text, active, alert, link, onClick }: SidebarItemProps): JSX.Element {
    const { expanded } = useContext(SidebarContext);
    const itemRef = useRef<HTMLLIElement>(null);

    const handleClick = (event: MouseEvent<HTMLLIElement>) => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <li ref={itemRef} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`} onClick={handleClick}>
            {link ? (
                <a href={link} className={`flex items-center w-full focus:outline-none ${active ? "text-indigo-800" : "text-gray-600"}`}>
                    {icon}
                    <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                </a>
            ) : (
                <>
                    {icon}
                    <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                </>
            )}
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>
                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    );
}



