import React from 'react'
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal(props : {children: any, open: boolean, tiny : boolean}){

    if (!props.open) return null;

    const modalSize = props.tiny ? 'w-5/12' : 'w-full';
  
    return (
        createPortal(
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
                <div className={`bg-white p-8 rounded-lg h-5/6 ${modalSize}`}>
                    {props.children}
                </div>
            </div>,
        document.getElementById('popups') as HTMLElement
        )
    )
}