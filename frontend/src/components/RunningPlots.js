import LineChart from "./LineChart";

export default function RunningPlots () {
  const data = [
    { x: "2024-11-01", y: 30 },
    { x: "2024-11-02", y: 50 },
    { x: "2024-11-03", y: 40 },
    { x: "2024-11-04", y: 60 },
    { x: "2024-11-05", y: 45 },
  ];

  return (
    <div>
      <h1>Line Chart</h1>
      <LineChart data={data} />
    </div>
  );
}