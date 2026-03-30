import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Homegirls from "./Homegirls";
import Home from "./Home";

const Selectionpage = () => {
  const initialSelected = useMemo(() => {
    const saved = localStorage.getItem("selectedCollege");
    if (saved === "girls") return "girls";
    if (saved === "law") return "law";
    return null;
  }, []);

  const [selectedTab, setSelectedTab] = useState(initialSelected);

  const handleSelect = (tab) => {
    setSelectedTab(tab);
    // Navbar/footer name update ke liye
    localStorage.setItem("selectedCollege", tab);
  };

  // Select na hua ho to bilkul sirf 2 options (navbar/footer hide)
  if (selectedTab === null) {
    const options = [
      {
        id: "girls",
        top: "Kishangarh Girls",
        bottom: "College",
        accent: "from-pink-500/20 via-rose-100 to-transparent",
        badge: "Admissions Open",
      },
      {
        id: "law",
        top: "Kishangarh Law",
        bottom: "College",
        accent: "from-blue-500/20 via-blue-100 to-transparent",
        badge: "Admissions Open",
      },
    ];

    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950">
              Select Your College
            </h1>
            <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Choose the campus to see the correct details and start your admission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className="group relative overflow-hidden rounded-2xl border border-blue-200/70 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-left p-7"
                aria-label={`Select ${opt.top} ${opt.bottom}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${opt.accent} opacity-100`}
                />
                <div className="relative">
                  <div className="inline-flex items-center rounded-full bg-white/70 border border-blue-200/70 px-4 py-2 text-blue-950 font-bold text-xs shadow-sm">
                    {opt.badge}
                  </div>

                  <div className="mt-5">
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 leading-tight">
                      <span className="block">{opt.top}</span>
                      <span className="block text-blue-800">{opt.bottom}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-gray-700 font-semibold">
                      Continue
                    </span>
                    <span className="w-10 h-10 rounded-full bg-blue-950 text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            You can change your selection anytime by refreshing the page.
          </div>
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