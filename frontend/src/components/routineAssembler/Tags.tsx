import React from 'react'

export interface TagsOption {
  readonly IdTag: number; // from the tags table
  readonly ID: number; // ID bounded to the excercise in the routine
  readonly value: string;
  readonly label: string;
}

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

