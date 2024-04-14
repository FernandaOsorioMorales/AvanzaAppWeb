import React from 'react'
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({children, open, onClose} : {children: any, open: boolean, onClose: () => void}){

    if (!open) return null;
  
    return (
        createPortal(
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <button onClick={onClose} className='fixed top-8 right-8 w-fit h-fit p-1 rounded hover:bg-gray-600 bg-red-500'> 
                    <X size={30}/>
                </button>
                <div className="bg-white p-8 rounded-lg h-5/6 w-11/12">
                    {children}
                </div>
            </div>,
        document.getElementById('popups') as HTMLElement
        )
    )
}

