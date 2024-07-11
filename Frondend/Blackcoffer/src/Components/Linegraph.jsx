import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

const Histogram = () => {
  const svgRef = useRef();
  const originalData = useSelector((state) => state.start_year.data);
  const [data, setData] = useState(originalData);

  const width = 700;
  const height = 300;
  const margin = { top: 50, right: 30, bottom: 50, left: 60 };

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove(); // Clear previous elements

    const intensityValues = data.map(d => d.intensity);

    const x = d3.scaleLinear()
      .domain([d3.min(intensityValues), d3.max(intensityValues)])
      .range([margin.left, width - margin.right]);

    const histogram = d3.histogram()
      .value(d => d.intensity)
      .domain(x.domain())
      .thresholds(x.ticks(20));

    const bins = histogram(data);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)]).nice()
      .range([height - margin.bottom, margin.top]);

    const barWidth = (x(bins[0].x1) - x(bins[0].x0)) * 0.9;

    const g = svg.append("g");

    g.selectAll("rect")
      .data(bins)
      .enter().append("rect")
      .attr("x", d => x(d.x0) + 1)
      .attr("y", d => y(d.length))
      .attr("width", barWidth)
      .attr("height", d => y(0) - y(d.length))
      .attr("fill", "steelblue");

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(10));

    g.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(10));

    g.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "gray")
      .text("Intensity");

    g.append("text")
      .attr("x", -margin.top)
      .attr("y", margin.left / 2)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("fill", "gray")
      .text("Frequency");

    return () => {
      svg.selectAll("*").remove();
    };

  }, [data, originalData, width, height]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default Histogram;
