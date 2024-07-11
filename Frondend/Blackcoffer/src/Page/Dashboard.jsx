import React from "react";
import Bargraph from "../Components/Bargraph";
import Scatterplot from "../Components/Scatterplot";
import LineGraph from "../Components/Linegraph";
const Dashboard = () => {
  return (
    <div className="m-10">
        <div className="border border-gray-300 rounded-lg w-full h-[600px]" >
        <span className=" text-xl font-bold text-gray-400 "> Scatterplot</span>
        <div className="pt-10">
        <Scatterplot/>
        </div>

      </div>
      <div className="border border-gray-300 rounded-lg w-full h-[600px]" >
        <span className=" text-xl font-bold text-gray-400 "> Scatterplot</span>
        <div className="pt-10">
            <LineGraph />
        </div>

      </div>
      <div  className=" mt-10 border border-gray-300 rounded-lg w-1/2 h-fit" >
        <span className="ml-10 mt-6 text-xl font-bold text-gray-400"> Intensity Barchar</span>
        
        <Bargraph />
      </div>
      
    </div>
  );
};

export default Dashboard;
