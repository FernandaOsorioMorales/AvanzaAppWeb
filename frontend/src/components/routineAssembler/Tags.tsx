import React from 'react'

export function TagContainer(params: {children: React.ReactNode, styles?: string}) {
  return (
    <ul className={`flex flex-roẉ ${params.styles}`}>
        {params.children}
    </ul>
  )
}

export function Tag(params: {tag: string}){
    return (
      <li className='text-base font-medium me-2 px-3 py-1 rounded-full bg-cyan-800 text-indigo-100'>
        {params.tag}
      </li>
    )
}

export interface TagsOption {
  readonly IdTag: number; // from the tags table
  readonly ID: number; // ID bounded to the excercise in the routine
  readonly value: string;
  readonly label: string;
}

// !DEGBUG ONLY
export const tagsOption: TagsOption[] = [
  { IdTag:15 ,ID:15 ,value: 'cara', label: 'Cara'},
  { IdTag:16 ,ID:16 ,value: 'gluteo', label: 'Gluteo'},
  { IdTag:17 ,ID:17 ,value: 'abdomen', label: 'Abdomen'},
  { IdTag:18 ,ID:18 ,value: 'cien', label: 'Cien'},
  { IdTag:19 ,ID:19 ,value: 'pecho', label: 'Pecho'},
  { IdTag:20 ,ID:20 ,value: 'tricep', label: 'Tricep'},
  { IdTag:21 ,ID:21 ,value: 'bicep', label: 'Bicep'},
  { IdTag:22 ,ID:22 ,value: 'cuadricep', label: 'Cuadricep'},
  { IdTag:23 ,ID:23 ,value: 'quinticep', label: 'Quinticep'},
  { IdTag:24 ,ID:24  ,value: 'pierna', label: 'Pierna'},
  { IdTag:25 ,ID:25  ,value: 'cardio', label: 'Cardio'}
];
