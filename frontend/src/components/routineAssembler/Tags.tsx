import React from 'react'
import { X } from 'lucide-react';

export function TagContainer(params: {children: React.ReactNode, styles?: string}) {
  return (
    <ul className={`flex flex-roẉ ${params.styles}`}>
        {params.children}
    </ul>
  )
}

export function Tag(params: {tag: string}){
    return (
      <li className='text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-yellow-900 text-yellow-300'>
        {params.tag}
      </li>
    )
}

export interface TagsOption {
  readonly id: number;
  readonly value: string;
  readonly label: string;
}

export const tagsOption = [
  { id:1 ,value: 'cara', label: 'Cara'},
  { id:2 ,value: 'gluteo', label: 'Gluteo'},
  { id:3 ,value: 'abdomen', label: 'Abdomen'},
  { id:4 ,value: 'cien', label: 'Cien'},
  { id:5 ,value: 'pecho', label: 'Pecho'},
  { id:6 ,value: 'tricep', label: 'Tricep'},
  { id:7 ,value: 'bicep', label: 'Bicep'},
  { id:8 ,value: 'cuadricep', label: 'Cuadricep'},
  { id:9 ,value: 'quinticep', label: 'Quinticep'},
  { id:10 ,value: 'pierna', label: 'Pierna'},
  { id:11 ,value: 'cardio', label: 'Cardio'}
];
