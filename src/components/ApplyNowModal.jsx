import React from "react";
import { FaTimes } from "react-icons/fa";
import { ADMISSION_BUTTONS } from "../constants/data";

const ApplyNowModal = ({ isOpen, onClose, collegeName }) => {
  if (!isOpen) return null;

  const handleOptionClick = () => {
    // Student direct register kar sake isliye Admissions registration page open kar rahe hain.
    const saved = localStorage.getItem("selectedCollege");
    let collegeSlug = saved;

    if (!collegeSlug && typeof collegeName === "string") {
      const name = collegeName.toLowerCase();
      collegeSlug = name.includes("girls") ? "girls" : name.includes("law") ? "law" : null;
    }

    if (collegeSlug) {
      localStorage.setItem("selectedCollege", collegeSlug);
    }

    const qs = collegeSlug ? `?college=${encodeURIComponent(collegeSlug)}` : "";
    window.location.href = `/admissions${qs}`;
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Apply Now - Admissions 2025{" "}
            {collegeName ? <span className="font-normal">({collegeName})</span> : null}
          </h3>

          <button
            onClick={() => onClose?.()}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          Admissions open hain. “Fees / Admission Process / Brochure” wali options pe click
          karte hi registration form open ho jayega.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADMISSION_BUTTONS.map((btn) => (
            <button
              key={btn.text}
              onClick={handleOptionClick}
              className={`${btn.color} text-white px-4 py-3 rounded-full hover:opacity-95 cursor-pointer font-bold text-base shadow`}
              type="button"
            >
              {btn.text}
            </button>
          ))}
        </div>

        <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
          <button
            onClick={() => onClose?.()}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
            type="button"
          >
            Close
          </button>
          <button
            onClick={handleOptionClick}
            className="px-5 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-semibold"
            type="button"
          >
            Student Registration
          </button>
          <button
            onClick={() => (window.location.href = "/student/login")}
            className="px-5 py-2 rounded-full bg-blue-900 hover:bg-blue-800 text-white font-semibold"
            type="button"
          >
            Student Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyNowModal;

