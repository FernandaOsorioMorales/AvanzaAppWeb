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
  { IdTag:1 ,ID:1 ,value: 'cara', label: 'Cara'},
  { IdTag:2 ,ID:2 ,value: 'gluteo', label: 'Gluteo'},
  { IdTag:3 ,ID:3 ,value: 'abdomen', label: 'Abdomen'},
  { IdTag:4 ,ID:4 ,value: 'cien', label: 'Cien'},
  { IdTag:5 ,ID:5 ,value: 'pecho', label: 'Pecho'},
  { IdTag:6 ,ID:6 ,value: 'tricep', label: 'Tricep'},
  { IdTag:7 ,ID:7 ,value: 'bicep', label: 'Bicep'},
  { IdTag:8 ,ID:8 ,value: 'cuadricep', label: 'Cuadricep'},
  { IdTag:9 ,ID:9 ,value: 'quinticep', label: 'Quinticep'},
  { IdTag:10 ,ID:10  ,value: 'pierna', label: 'Pierna'},
  { IdTag:11 ,ID:11  ,value: 'cardio', label: 'Cardio'}
];
