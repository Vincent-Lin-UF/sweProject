import LineChart from "./LineChart";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useRef, useState} from "react";

const distTime = (data) => {
  return data.map((v) => ({x: v.run_date, y: v.distance}));
}

const durTime = (data) => {
  return data.map((v) => ({x: v.run_date, y: v.duration}));
}

const paceTime = (data) => {
  return data.map((v) => ({x: v.run_date, y: v.duration / v.distance}));
}

const valid_plot_selections = {
  'Distance vs. Time': distTime,
  'Duration vs. Time': durTime,
  'Pace vs. Time': paceTime
}

export default function RunningPlots () {
  // const data = [
  //   { x: "2024-11-01", y: 30 },
  //   { x: "2024-11-02", y: 50 },
  //   { x: "2024-11-03", y: 40 },
  //   { x: "2024-11-04", y: 60 },
  //   { x: "2024-11-05", y: 45 },
  // ];

  const [loading, setLoading] = useState(true);
  const data = useRef([]);
  const plotData = useRef([]);

  useEffect(() => {
    const get_data = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/data/get-workouts?workout=Running', {
          credentials: 'include',
        });
        const req = await response.json();
        data.current = req.data;
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    }

    get_data();
  }, [])

  const [plotSelection, setPlotSelection] = useState('');
  const handleChange = (event) => {
    let plotType = event.target.value;
    plotData.current = valid_plot_selections[plotType](data.current);
    setPlotSelection(plotType);
  }

  if (loading) {
    return (<div>
      <h1>Loading</h1>
    </div>);
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Plot selection</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={plotSelection}
          label="Plot selection"
          onChange={handleChange}
        >
          <MenuItem value={'Distance vs. Time'}>Distance vs. Time</MenuItem>
          <MenuItem value={'Duration vs. Time'}>Duration vs. Time</MenuItem>
          <MenuItem value={'Pace vs. Time'}>Pace vs. Time</MenuItem>
        </Select>
      </FormControl>
      <LineChart data={plotData.current} />
    </div>
  );
}