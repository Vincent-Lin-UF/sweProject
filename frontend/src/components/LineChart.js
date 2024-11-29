import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, width = 500, height = 500 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const sortedData = data.slice().sort((a, b) => new Date(a.x) - new Date(b.x));

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(sortedData, d => new Date(d.x)))
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sortedData, d => d.y)]) // Adjust y domain to fit the data
      .range([innerHeight, 0]);

    chart
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat("%b %d")));

    chart.append("g").call(d3.axisLeft(yScale).ticks(5));

    const line = d3
      .line()
      .x(d => xScale(new Date(d.x)))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    chart
      .append("path")
      .datum(sortedData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;
