import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

const Scatterplot = () => {
  const svgRef = useRef();
  const originalData = useSelector((state) => state.intensity.data);
  const [data, setData] = useState(originalData);
  const [selectedLikelihood, setSelectedLikelihood] = useState(null);

  const width = 1400;
  const height = 500;
  const margin = { top: 50, right: 30, bottom: 50, left: 60 };

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove(); // Clear previous elements

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)]).nice()
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.likelihood) + 1]).nice()
      .range([height - margin.bottom, margin.top]);

    const size = d3.scaleSqrt()
      .domain([0, d3.max(data, d => d.count)])
      .range([0, 20]);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.likelihood))
      .range(d3.schemeCategory10);

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

    svg.call(zoom);

    const g = svg.append("g");

    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.intensity))
      .attr("cy", d => y(d.likelihood))
      .attr("r", d => size(d.count))
      .attr("fill", d => color(d.likelihood))
      .attr("opacity", d => (selectedLikelihood === null || selectedLikelihood === d.likelihood) ? 0.7 : 0.1);

    // Add x-axis
    const xAxis = d3.axisBottom(x).ticks(10);
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.selectAll(".tick text").attr("fill", "gray"))
      .call(g => g.selectAll(".tick line").attr("stroke", "gray"))
      .call(g => g.select(".domain").attr("stroke", "gray"))
      .append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", margin.bottom - 10)
      .attr("fill", "gray")
      .style("text-anchor", "middle")
      .text("Intensity");

    // Add y-axis
    const yAxis = d3.axisLeft(y).ticks(10);
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .call(g => g.selectAll(".tick text").attr("fill", "gray"))
      .call(g => g.selectAll(".tick line").attr("stroke", "gray"))
      .call(g => g.select(".domain").attr("stroke", "gray"))
      .append("text")
      .attr("class", "axis-label")
      .attr("x", -margin.top)
      .attr("y", height / 15)
      .attr("fill", "gray")
      .style("text-anchor", "start")
      .attr("transform", "rotate(-0)")
      .text("Likelihood");

    // Add legend
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - margin.right},${margin.top})`);

    legend.selectAll("rect")
      .data(color.domain())
      .enter()
      .append("rect")
      .attr("x", -20)
      .attr("y", (d, i) => i * 20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", color)
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedLikelihood(selectedLikelihood === d ? null : d);
      });

    legend.selectAll("text")
      .data(color.domain())
      .enter()
      .append("text")
      .attr("x", -24)
      .attr("y", (d, i) => i * 20 + 12)
      .attr("fill", "gray")
      .style("text-anchor", "end")
      .attr("cursor", "pointer")
      .text(d => `Likelihood: ${d}`)
      .on("click", (event, d) => {
        setSelectedLikelihood(selectedLikelihood === d ? null : d);
      });

    function zoomed(event) {
      const { transform } = event;
      g.attr("transform", transform);
      g.attr("stroke-width", 1 / transform.k);
      svg.selectAll('g.x-axis').call(xAxis.scale(transform.rescaleX(x)));
      svg.selectAll('g.y-axis').call(yAxis.scale(transform.rescaleY(y)));
    }

    return () => {
      svg.on(".zoom", null);
    };
  }, [data, originalData, selectedLikelihood, width, height]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default Scatterplot;
