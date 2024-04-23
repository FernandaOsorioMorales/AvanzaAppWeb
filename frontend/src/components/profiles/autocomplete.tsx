import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

// Define el tipo para las opciones de Autocomplete
interface FilmOption {
  title: string;
}

export function SpecialtySearch() {
  const top100Films: FilmOption[] = [
    { title: 'Gym' },
    { title: 'Yoga' },
    { title: 'Ciclismo' },
    { title: 'Powerlifting' },
    { title: 'Running' },
    { title: 'Box' },
    { title: 'Crossfit' },
    { title: 'Natación' },
  ];

  return (
    <div>
      <Autocomplete
        id="highlights-demo"
        sx={{ width: 300 }}
        options={top100Films}
        getOptionLabel={(option: FilmOption) => option.title}
        renderInput={(params) => (
          <TextField {...params} label="Selecciona su especialidad" margin="normal" />
        )}
        renderOption={(
          props,
          option: FilmOption,
          { inputValue }: { inputValue: string }
        ) => {
          const matches = match(option.title, inputValue, { insideWords: true });
          const parts = parse(option.title, matches);

          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
    </div>
  );
}

export default SpecialtySearch;