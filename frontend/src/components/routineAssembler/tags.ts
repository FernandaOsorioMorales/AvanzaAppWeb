export interface TagsOption {
    readonly value: string;
    readonly label: string;
  }
  
  export const tagsOption: readonly TagsOption[] = [
    { value: 'cara', label: 'Cara'},
    { value: 'gluteo', label: 'Gluteo'},
    { value: 'abdomen', label: 'Abdomen'},
    { value: 'cien', label: 'Cien'},
    { value: 'pecho', label: 'Pecho'},
    { value: 'tricep', label: 'Tricep'},
    { value: 'bicep', label: 'Bicep'},
    { value: 'cuadricep', label: 'Cuadricep'},
    { value: 'quinticep', label: 'Quinticep'},
    { value: 'pierna', label: 'Pierna'},
    { value: 'cardio', label: 'Cardio'}
  ];