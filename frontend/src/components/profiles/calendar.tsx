import React from 'react'; // Importa React para JSX
import FullCalendar from '@fullcalendar/react'; // Importa EventInput para tipos
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventContentArg } from '@fullcalendar/common'; // Tipo para eventos personalizados

// Componente principal
export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      eventContent={renderEventContent} // Asigna el renderizador personalizado
    />
  );
}

// Renderizador personalizado
function renderEventContent(eventInfo: EventContentArg) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}