import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import Button from '@mui/material/Button';

function MyStopwatch(): JSX.Element {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  // Función para agregar ceros a la izquierda si es necesario
  const addLeadingZeros = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div style={{ textAlign: 'center' }}>

      <p>Temporizador para medir tiempos de descanso</p>
      <div style={{ fontSize: '50px' }}>
        <span>{addLeadingZeros(days)}</span>:<span>{addLeadingZeros(hours)}</span>:<span>{addLeadingZeros(minutes)}</span>:<span>{addLeadingZeros(seconds)}</span>
      </div>

      <Button onClick={start} style={{ color: '#36BFBF' }}>Comenzar</Button>
      <Button onClick={pause} style={{ color: '#36BFBF' }}>Pausa</Button>
      <Button onClick={reset} style={{ color: '#DC5663' }}>Reiniciar</Button>
    </div>
  );
}

export default MyStopwatch;