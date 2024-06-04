
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Drawer, ButtonToolbar, Placeholder } from 'rsuite';
import 'rsuite/Drawer/styles/index.css';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple, cyan } from '@mui/material/colors';
import Button from '@mui/material/Button';
import MyStopwatch from './watch';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: lime,
    },
});

interface Exercise {
    IdExercise: number;
    Name: string;
    Description: string;
    Sets: number;
    Reps: number;
    Ordinal: number;
}

interface Tag {
    Id: number;
    Name: string;
}

interface DrawerProps {
    idWorkout: number;
}

const MyDrawer: React.FC<DrawerProps> = ({idWorkout }) => {
    const [backdrop, setBackdrop] = React.useState<string | boolean>('static');
    const [open, setOpen] = React.useState(false);
    const [exercises, setExercises] = React.useState<Exercise[]>([]);
    const [tags, setTags] = React.useState<Tag[]>([]);
    const [loading, setLoading] = React.useState(false);

    const fetchWorkoutDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/workout/detail?idWorkout=${idWorkout}`,);
            setExercises(response.data.exercises);
            setTags(response.data.Tags);
        } catch (error) {
            console.error('Error fetching workout details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => {
        setOpen(true);
        fetchWorkoutDetails();
    };

    return (
        <>
            <hr />
            <ButtonToolbar>
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#36BFBF', color: 'white' }}
                    onClick={handleOpen}
                >
                    ¡Empecemos!
                </Button>
            </ButtonToolbar>
            <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title className='font-bold'>Tu Rutina</Drawer.Title>
                    <Drawer.Actions>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#DC5663', color: 'white' }}
                            onClick={() => setOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body>
                    <MyStopwatch />
                    {loading ? (
                        <Placeholder.Paragraph rows={5} />
                    ) : (
                        <div>
                            <h3 className='text-3xl font-bold text-cyan-600 text-center my-5'>Ejercicios</h3>
                            {exercises.map(exercise => (
                                <div key={exercise.IdExercise} className='mb-5 p-4 border rounded-lg shadow-sm bg-blue-50'>
                                    <h4 className="text-xl font-semibold text-gray-800 ">{exercise.Name}</h4>
                                    <p className='"text-gray-600"'>{exercise.Description}</p>
                                    <p className="text-gray-600">Sets: {exercise.Sets} </p>
                                    <p className='text-gray-600'>Reps: {exercise.Reps}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </Drawer.Body>
            </Drawer>
        </>
    );
};

export default MyDrawer;