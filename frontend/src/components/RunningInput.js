import {Box, TextField} from "@mui/material";
import React, {useState} from "react";

function RunningInput ( props ) {
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");

  const { workoutData } = props;

  const handleDistance = (num) => {
    workoutData.current.distance = num;
    setDistance(num);
  }

  const handleDuration = (num) => {
    workoutData.current.duration = num;
    setDuration(num);
  }

  return (
    <Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="distance"
        label="Distance (miles)"
        value={distance}
        type="number"
        onChange={(e) => handleDistance(e.target.value)}
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
        id="duration"
        label="Duration (minutes)"
        InputLabelProps={{ shrink: true }}
        value={duration}
        type="number"
        onChange={(e) => handleDuration(e.target.value)}
        sx={{
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        }}
      />

    </Box>
  );
}

export default RunningInput;