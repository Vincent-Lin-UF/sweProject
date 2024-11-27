import React, { useState } from 'react';
import WorkoutInput from '../components/WorkoutInput';
import Dashboard from '../components/Dashboard';

function WorkoutTracker() {
    const [workouts, setWorkouts] = useState([]);

    const handleAddWorkout = (workout) => {
        setWorkouts([...workouts, workout]);
    };

    const handleDeleteWorkout = (index) => {
        setWorkouts((prevWorkouts) => prevWorkouts.filter((_, i) => i !== index));
    };

    return (
        <div>
            <WorkoutInput onAddWorkout={handleAddWorkout} />
            <Dashboard workouts={workouts} onDeleteWorkout={handleDeleteWorkout} />
        </div>
    );
}

export default WorkoutTracker;
