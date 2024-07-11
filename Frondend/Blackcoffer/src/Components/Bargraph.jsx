import { useEffect, useRef } from "react";
import  * as d3 from "d3";
import useGetdata from "../Hooks/useGetdata";
import { useSelector } from "react-redux";

const Bargraph = () => {
    const ref=useRef()
    const{getdata}=useGetdata()
  
    useEffect(()=>{
        
      getdata()

    },[])
    const intensity=useSelector((state)=>state.intensity.data)

    useEffect(() => {
        // set the dimensions and margins of the graph
        const margin = { top: 30, right: 30, bottom: 70, left: 60 },
          width = 700 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
    
        // append the svg object to the body of the page
        const svg = d3
          .select(ref.current)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
    
        // Parse the Data
        // d3.csv(
        //   "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv"
        // ).then(function (intensity) {
          // X axis
          const x = d3
            .scaleBand()
            .range([0, width])
            .domain(intensity.map((d) => d.intensity))
            .padding(0.2);
          svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
    
          // Add Y axis
          const y = d3.scaleLinear().domain([0, 250]).range([height, 0]);
          svg.append("g").call(d3.axisLeft(y));
        
          const color = d3.scaleOrdinal(d3.schemeCategory10);
          // Bars
          svg
            .selectAll("mybar")
            .data(intensity)
            .join("rect")
            .attr("x", (d) => x(d.intensity))
            .attr("y", (d) => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d.count))
            .attr("fill", (d) => color(d.intensity));

        // });
      }, []);
    
      return <svg width={760} height={500} id="barchart" ref={ref} />;

}

export default Bargraph


