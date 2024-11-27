import React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Container,
    CssBaseline,
    Paper,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function Dashboard({ workouts, onDeleteWorkout }) {
    const sortedWorkouts = [...workouts].sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time || '00:00'}`);
        const dateTimeB = new Date(`${b.date}T${b.time || '00:00'}`);
        return dateTimeB - dateTimeA;
    });

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(hours, minutes);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        mb: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <FitnessCenterIcon sx={{ fontSize: 40, color: '#007aff' }} />
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Workout Dashboard
                    </Typography>
                </Box>

                {sortedWorkouts.length > 0 ? (
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#007aff' }}>
                                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
                                        Activity
                                    </TableCell>
                                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
                                        Duration (minutes)
                                    </TableCell>
                                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
                                        Date
                                    </TableCell>
                                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
                                        Time
                                    </TableCell>
                                    <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }} align="right">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedWorkouts.map((workout, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                        }}
                                    >
                                        <TableCell>{workout.activity}</TableCell>
                                        <TableCell>{workout.duration}</TableCell>
                                        <TableCell>{formatDate(workout.date)}</TableCell>
                                        <TableCell>{formatTime(workout.time)}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() => onDeleteWorkout(index)}
                                                sx={{ color: '#ff3b30' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                ) : (
                    <Typography
                        sx={{
                            color: '#666',
                            fontSize: '1.2rem',
                            mt: 4,
                            textAlign: 'center',
                        }}
                    >
                        No workouts logged yet. Start tracking your fitness journey!
                    </Typography>
                )}
            </Box>
        </Container>
    );
}

export default Dashboard;
