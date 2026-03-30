import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Homegirls from "./Homegirls";
import Home from "./Home";

const Selectionpage = () => {
  // First load pe sirf options dikhane ke liye default null rakha hai.
  const [selectedTab, setSelectedTab] = useState(null);

  const handleSelect = (tab) => {
    setSelectedTab(tab);
    // Navbar/footer name update ke liye
    localStorage.setItem("selectedCollege", tab);
  };

  // Select na hua ho to bilkul sirf 2 options (navbar/footer hide)
  if (selectedTab === null) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white gap-6">
        <div className="flex gap-6 bg-gray-100 p-4 rounded-xl shadow">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="college"
              checked={selectedTab === "girls"}
              onChange={() => handleSelect("girls")}
            />
            kishagrh girls
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="college"
              checked={selectedTab === "law"}
              onChange={() => handleSelect("law")}
            />
            kishangrh law cllg
          </label>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {selectedTab === "girls" ? <Homegirls /> : <Home />}
      <Footer />
    </>
  );
};

export default Selectionpage;