import React, { useState } from "react";
import Homegirls from "./Homegirls";
import Home from "./Home";

const Selectionpage = () => {
  const [selectedTab, setSelectedTab] = useState("girls");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white gap-6">
      
      {/* Tabs */}
      <div className="flex gap-6 bg-gray-100 p-4 rounded-xl shadow">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="college"
            checked={selectedTab === "girls"}
            onChange={() => setSelectedTab("girls")}
          />
          Kishangarh Girls College
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="college"
            checked={selectedTab === "law"}
            onChange={() => setSelectedTab("law")}
          />
          Kishangarh Law College
        </label>
      </div>

      {/* Content */}
      <div className="w-full flex justify-center">
        {selectedTab === "girls" && <Homegirls />}
        {selectedTab === "law" && <Home />}
      </div>

    </div>
  );
};

export default Selectionpage;