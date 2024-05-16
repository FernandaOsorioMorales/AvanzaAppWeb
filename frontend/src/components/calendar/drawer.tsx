import * as React from 'react';
import { Drawer, ButtonToolbar, Placeholder } from 'rsuite';
import 'rsuite/Drawer/styles/index.css';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple,cyan } from '@mui/material/colors';
import Button from '@mui/material/Button';
import MyStopwatch from './watch';

interface DrawerProps {
  rutina: string;
}

const theme = createTheme({
    palette: {
      primary: cyan,
      secondary: lime,
    },
  });


const MyDrawer: React.FC<DrawerProps> = ({ rutina }) => {
  const [backdrop, setBackdrop] = React.useState<string | boolean>('static');
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <hr />

      <ButtonToolbar>
       <Button variant="contained" style={{ backgroundColor: '#36BFBF', color: 'white' }} onClick={() => setOpen(true)}>¡Empecemos!</Button>
      </ButtonToolbar>
      <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Tu Rutina</Drawer.Title>
          <Drawer.Actions>
          <Button variant="contained" style={{ backgroundColor: '#DC5663', color: 'white' }} onClick={() => setOpen(false)}>
              Cerrar
            </Button>
            </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
            <MyStopwatch/>
          <Placeholder.Paragraph />
          {rutina}
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default MyDrawer;