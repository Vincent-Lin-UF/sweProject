import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    CssBaseline,
    Paper,
} from '@mui/material';

function WorkoutInput({ onAddWorkout }) {
    const now = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];
    const formatTime = (date) => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(formatDate(now));
    const [time, setTime] = useState(formatTime(now));

    const handleSubmit = (e) => {
        e.preventDefault();
        const workout = { activity, duration, date, time };
        onAddWorkout(workout);
        setActivity('');
        setDuration('');
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Paper
                elevation={5}
                sx={{
                    mt: 8,
                    p: 4,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#fdfdfd',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        mb: 3,
                        color: '#333',
                    }}
                >
                    Log Your Workout
                </Typography>

                <Typography
                    component="p"
                    variant="body1"
                    sx={{
                        mb: 4,
                        color: '#666',
                        textAlign: 'center',
                    }}
                >
                    Track your fitness progress by logging your workout details below. The current date and time are pre-filled for your convenience.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="activity"
                        label="Activity Type (e.g., Bench Press, Squats)"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 8,
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="duration"
                        label="Duration (in minutes)"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 8,
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="date"
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 8,
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="time"
                        label="Time"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        sx={{
                            mb: 4,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 8,
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            borderRadius: 8,
                            backgroundColor: '#007aff',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#005bb5',
                            },
                        }}
                    >
                        Log Workout
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default WorkoutInput;
