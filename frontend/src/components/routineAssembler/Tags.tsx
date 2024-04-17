import React from 'react'
import { X } from 'lucide-react';

export function TagContainer(params: {children: React.ReactNode, styles?: string}) {
  return (
    <ul className={`flex flex-roẉ ${params.styles}`}>
        {params.children}
    </ul>
  )
}

export function Tag(params: {tag: string, deletable?: boolean}){
    if(params.deletable){
        return (
            <li className='text-xs font-medium me-2 pl-2.5 pr-1.5 py-0.5 rounded-full bg-yellow-900 text-yellow-300'>
                {params.tag}
                <button className='bg-yellow-700 rounded-full p-1 ml-2'>
                    <X size={12} color='#ffffff' />
                </button>
            </li>
        )
    } else
    return (
      <li className='text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-yellow-900 text-yellow-300'>
        {params.tag}
      </li>
    )
}
