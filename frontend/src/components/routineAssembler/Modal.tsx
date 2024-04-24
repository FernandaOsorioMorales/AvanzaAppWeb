import React from 'react'
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal(props : {children: any, open: boolean, width:string, height:string, idElement: string, z:string}){

    if (!props.open) return null;

    // const modalSize = props.tiny ? 'w-6/12' : 'w-full';
  
    return (
        createPortal(
            <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ${props.z}`}>
                <div className={`bg-white p-8 rounded-lg ${props.height} ${props.width}`}>
                    {props.children}
                </div>
            </div>,
        document.getElementById(props.idElement) as HTMLElement
        )
    )
}