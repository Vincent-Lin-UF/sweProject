import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Paper, Select, MenuItem, InputLabel,
} from '@mui/material';

import RunningInput from "./RunningInput";
import axios from "axios";


const availableWorkouts = [
  "Running",
  "Swimming",
];

const WorkoutInputComponentMap = {
  Default: () => (<Box></Box>),
  Running: RunningInput
}

function WorkoutInput({ onAddWorkout }) {
  const now = new Date();
  const formatDate = (date) => date.toISOString().split('T')[0];
  const formatTime = (date) => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState("00-00-0000");
  const workoutData = useRef({});

  const InputComponent = WorkoutInputComponentMap[activity === "" ? "Default" : activity];

  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = { activity, duration, date };
    onAddWorkout(workout);
    setActivity('');
    setDuration('');
    axios.post(
      process.env.REACT_APP_API_URL + '/api/data/log-workout',
      workoutData.current,
      {withCredentials: true}
    ).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  };

  const onWorkoutChange = (event) => {
    let workout = event.target.value;
    setActivity(workout);
    workoutData.current.workout = workout;
  }

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
          <InputLabel id="workout-input-label">Workout</InputLabel>
          <Select
            labelId="workout-input-label"
            id="workout-input"
            value={activity}
            label="Workout"
            onChange={onWorkoutChange}
            sx={{ width: '100%' }}
            >
              {
                availableWorkouts.map((item, index) => (
                  <MenuItem value={item} key={item}> {item} </MenuItem>
                ))
              }
          </Select>
          <TextField
            margin="normal"
            fullWidth
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date === "00-00-0000" ? "" : date}
            onChange={(e) => {
              setDate(e.target.value); workoutData.current.date = e.target.value; }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
              },
            }}
          />
          {<InputComponent workoutData={workoutData} />}
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
