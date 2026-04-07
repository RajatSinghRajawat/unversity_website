import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService, { API_BASE_URL } from "../services/api";

const collegeSlugToCode = {
  girls: "GYAN001",
  law: "GYAN002",
};

const generateEnrollmentId = () => {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const stamp = Date.now().toString().slice(-7);
  return `ENR-${stamp}-${rand}`;
};
// llllll

const Admissions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const initialCollegeSlug =
    searchParams.get("college") || localStorage.getItem("selectedCollege");

  const computedUniversityCode =
    searchParams.get("universityCode") ||
    (initialCollegeSlug ? collegeSlugToCode[initialCollegeSlug] : "") ||
    "";

  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  const [formData, setFormData] = useState(() => ({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    department: "",
    year: "",
    guardianName: "",
    guardianPhone: "",
    emergencyContact: "",
    enrollmentId: "",
    JoiningDate: "",
    DateOfBirth: "",
    Gender: "Male",
    aadharNo: "",
    course_id: "",
    universityCode: computedUniversityCode,
    imageFile: null,
  }));

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      universityCode: computedUniversityCode,
      enrollmentId: prev.enrollmentId || generateEnrollmentId(),
    }));
  }, [computedUniversityCode]);

  useEffect(() => {
    const loadCourses = async () => {
      if (!computedUniversityCode) return;
      setCoursesLoading(true);
      try {
        const res = await ApiService.getAllCourses({
          universityCode: computedUniversityCode,
        });
        setCourses(res?.data || []);

        // Auto-select first course (nice default) and derive department.
        const first = res?.data?.[0];
        if (first) {
          setFormData((prev) => {
            if (prev.course_id) return prev; // user already chose a course
            return {
              ...prev,
              course_id: first._id,
              department: first.department || "",
            };
          });
        }
      } catch (e) {
        console.error("Courses load failed:", e);
      } finally {
        setCoursesLoading(false);
      }
    };

    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedUniversityCode]);

  const collegeTitle = useMemo(() => {
    if (initialCollegeSlug === "girls") return "Kishangarh Girls College";
    if (initialCollegeSlug === "law") return "Kishangarh Law College";
    return "Admissions";
  }, [initialCollegeSlug]);

  useEffect(() => {
    if (!formData.course_id) return;
    const selected = courses.find((c) => c._id === formData.course_id);
    if (!selected) return;
    if (selected.department && selected.department !== formData.department) {
      setFormData((prev) => ({ ...prev, department: selected.department }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.course_id, courses]);

  const [submitError, setSubmitError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");

  const validate = () => {
    if (!computedUniversityCode) return "College/University choose nahi hua.";
    if (!formData.name.trim()) return "Name required hai.";
    if (!formData.email.trim()) return "Email required hai.";
    if (!formData.password.trim()) return "Password required hai.";
    if (!formData.phone.trim()) return "Phone required hai.";
    if (!formData.address.trim()) return "Address required hai.";
    if (!formData.department.trim()) return "Department required hai.";
    if (!formData.year.trim()) return "Year required hai.";
    if (!formData.guardianName.trim()) return "Guardian name required hai.";
    if (!formData.guardianPhone.trim()) return "Guardian phone required hai.";
    if (!formData.emergencyContact.trim())
      return "Emergency contact required hai.";
    if (!formData.enrollmentId.trim()) return "Enrollment ID required hai.";
    if (!formData.JoiningDate.trim()) return "Joining Date required hai.";
    if (!formData.DateOfBirth.trim()) return "Date of Birth required hai.";
    if (!formData.aadharNo.trim()) return "Aadhar number required hai.";
    if (!formData.course_id) return "Course selection required hai.";
    if (!formData.imageFile) return "Photo/Document upload required hai.";
    return "";
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError("");
    setSubmitSuccess("");
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const error = validate();
    if (error) {
      setSubmitError(error);
      return;
    }

    try {
      setSubmitLoading(true);

      const fd = new FormData();
      fd.append("image", formData.imageFile);
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("password", formData.password);
      fd.append("phone", formData.phone);
      fd.append("address", formData.address);
      fd.append("department", formData.department);
      fd.append("year", formData.year);
      fd.append("guardianName", formData.guardianName);
      fd.append("guardianPhone", formData.guardianPhone);
      fd.append("emergencyContact", formData.emergencyContact);
      fd.append("universityCode", computedUniversityCode);
      fd.append("enrollmentId", formData.enrollmentId);
      fd.append("JoiningDate", formData.JoiningDate);
      fd.append("DateOfBirth", formData.DateOfBirth);
      fd.append("Gender", formData.Gender);
      fd.append("aadharNo", formData.aadharNo);
      fd.append("course_id", formData.course_id);

      const url = `${API_BASE_URL}/api/students/create`;
      const res = await fetch(url, { method: "POST", body: fd });

      const contentType = res.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        setSubmitError(payload?.message || payload?.error || "Registration failed.");
        return;
      }

      setSubmitSuccess(
        "Registration successful! Ab aap Student Login se login kar sakte hain."
      );
      setTimeout(() => navigate("/student/login"), 1200);
    } catch (e) {
      console.error(e);
      setSubmitError("Unable to connect to server. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!computedUniversityCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl font-extrabold text-blue-950">
            Choose College First
          </h1>
          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Registration ke liye pehle college select karein.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("selectedCollege", "girls");
                navigate("/admissions?college=girls");
              }}
              className="bg-white border border-blue-200 hover:border-blue-300 hover:shadow-md text-blue-950 font-extrabold px-5 py-3 rounded-xl"
            >
              Kishangarh Girls
              <span className="block text-blue-800 font-bold">College</span>
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("selectedCollege", "law");
                navigate("/admissions?college=law");
              }}
              className="bg-white border border-blue-200 hover:border-blue-300 hover:shadow-md text-blue-950 font-extrabold px-5 py-3 rounded-xl"
            >
              Kishangarh Law
              <span className="block text-blue-800 font-bold">College</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-900 text-white px-4 py-2 text-xs sm:text-sm shadow-lg">
            <span>Admission Form</span>
            <span className="opacity-80">·</span>
            <span>{collegeTitle}</span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-blue-950">
            Register Now
          </h1>
          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Aapka data submit hone ke baad aap Student Login se access le sakte hain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg p-5 sm:p-7 border border-blue-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Student Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Create password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone number"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Course
                  </label>
                  <select
                    name="course_id"
                    value={formData.course_id}
                    onChange={(e) => {
                      const nextCourseId = e.target.value;
                      const nextCourse = courses.find((c) => c._id === nextCourseId);
                      setFormData((prev) => ({
                        ...prev,
                        course_id: nextCourseId,
                        department: nextCourse?.department || prev.department,
                      }));
                      setSubmitError("");
                      setSubmitSuccess("");
                    }}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={coursesLoading}
                    required
                  >
                    {coursesLoading && <option value="">Loading...</option>}
                    {!coursesLoading && courses.length === 0 && (
                      <option value="">No courses found</option>
                    )}
                    {!coursesLoading &&
                      courses.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.courseName} ({c.courseCode})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Department
                  </label>
                  <input
                    value={formData.department}
                    readOnly
                    className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Admission Year
                  </label>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 2026"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Enrollment ID
                  </label>
                  <input
                    name="enrollmentId"
                    value={formData.enrollmentId}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Auto-generated"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Joining Date
                  </label>
                  <input
                    name="JoiningDate"
                    type="date"
                    value={formData.JoiningDate}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    name="DateOfBirth"
                    type="date"
                    value={formData.DateOfBirth}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Gender
                  </label>
                  <select
                    name="Gender"
                    value={formData.Gender}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Aadhar No.
                  </label>
                  <input
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter aadhar number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Guardian Name
                  </label>
                  <input
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Parent/Guardian name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Guardian Phone
                  </label>
                  <input
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Guardian phone number"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Emergency Contact
                  </label>
                  <input
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={onChange}
                    className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Emergency contact number"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Student Photo / Document (Required)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="mt-2 w-full text-sm"
                    required
                  />
                  {formData.imageFile && (
                    <div className="mt-2 text-xs text-gray-600">
                      Selected: {formData.imageFile.name}
                    </div>
                  )}
                </div>
              </div>

              {submitError && (
                <div className="mt-5 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="mt-5 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                  {submitSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={submitLoading}
                className={`mt-6 w-full bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm sm:text-base shadow-lg transition-transform ${
                  submitLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01]"
                }`}
              >
                {submitLoading ? "Submitting..." : "Submit Registration"}
              </button>

              <div className="mt-4 text-center text-xs text-gray-500">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/student/login")}
                  className="text-blue-900 font-semibold hover:underline"
                >
                  Go to Student Login
                </button>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-5 sm:p-7 sticky top-24">
              <h2 className="text-lg font-extrabold text-blue-950">
                Registration Tips
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Backend ke hisaab se image upload mandatory hai. Course selection
                se department automatically set ho jayega.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-blue-50 p-4">
                  <div className="text-sm font-bold text-blue-950">
                    College Code
                  </div>
                  <div className="mt-1 text-sm text-gray-700 font-semibold">
                    {computedUniversityCode}
                  </div>
                </div>

                <div className="rounded-xl bg-pink-50 p-4">
                  <div className="text-sm font-bold text-blue-950">
                    What happens next?
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    Registration submit hone ke baad aap login karke student portal use kar
                    sakte hain.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Admissions;

