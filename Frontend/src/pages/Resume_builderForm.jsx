import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loading";

function ResumeBuilderForm() {
  const [resumedata, setResumedata] = useState({
    name: "",
    address: "",
    dob: "",
    email: "",
    phone: "",
    lastQualification: "",
    currentCourse: "",
    branch: "",
    currentSem: "",
    college: "",
    skill: "",
    interest: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setResumedata({ ...resumedata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      // 1️⃣ Save student form
      const saveRes = await axios.post(
        "http://127.0.0.1:8000/api/form/",
        {
          name: resumedata.name,
          // dob: resumedata.dob,
          email: resumedata.email,
          phone: resumedata.phone,
          address: resumedata.address,
          qualification: resumedata.lastQualification,
          course: resumedata.currentCourse,
          branch: resumedata.branch,
          college: resumedata.college,
          skill: resumedata.skill,
          interest: resumedata.interest,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const studentId = saveRes.data.id;

      // 2️⃣ Generate only roadmap
      const roadmapRes = await axios.post(
        "http://127.0.0.1:8000/api/generate_roadmap/",
        { student_id: studentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 3️⃣ Navigate with roadmap data
      navigate("/ai/AIPackageResult", { state: roadmapRes.data });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to generate roadmap. Please check console.");
    } finally {
      setLoading(false);
    }
  };

  // ...existing JSX...

  return (
    <>
      <Navbar />

      {loading && <Loader />}

      <div className="max-w-6xl mx-auto ml-30 p-5 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Roadmap Builder
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Details Column */}
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-gray-700 border-b-2 border-green-500 pb-2 mb-4">
                Personal Details
              </h5>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={resumedata.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={resumedata.address} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter your address"
                />
              </div> */}

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={resumedata.dob} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div> */}

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={resumedata.email} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter your email"
                />
              </div> */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={resumedata.phone} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter your Phone"
                />
              </div> */}
            </div>

            {/* Education Column */}
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">
                Education
              </h5>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Qualification
                </label>
                <select
                  name="lastQualification"
                  value={resumedata.lastQualification}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">-- Select Course --</option>
                  <option value="12-PCM">12th - PCM</option>
                  <option value="12-PCB">12th - PCB</option>
                  <option value="12-ARTS">12th - Arts</option>
                  <option value="12-Commerce">12th - Commerce</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Course
                </label>
                <select
                  name="currentCourse"
                  value={resumedata.currentCourse}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">-- Select Course --</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="BBA">BBA</option>
                  <option value="BSC">BSC</option>
                  <option value="B.Com">B.Com</option>
                  <option value="B.A">B.A</option>
                </select>
              </div>

              {resumedata.currentCourse === "B.Tech" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <select
                    name="branch"
                    value={resumedata.branch}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  >
                    <option value="">-- Select Branch --</option>
                    <option value="CSE">Computer Science Engineering</option>
                    <option value="Electrical">Electrical Engineering</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="ECE">Electronics and Communication</option>
                    <option value="EE">Electrical and Electronics</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Semester
                </label>
                <select
                  name="currentSem"
                  value={resumedata.currentSem}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">-- Select Semester --</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                <input 
                  type="text" 
                  name="college" 
                  value={resumedata.college} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter your college name"
                />
              </div> */}
            </div>

            {/* Skills & Interests Column */}
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-gray-700 border-b-2 border-purple-500 pb-2 mb-4">
                Skills & Interests
              </h5>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <textarea
                  name="skill"
                  value={resumedata.skill}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                  placeholder="e.g., JavaScript, Python, React, HTML, CSS"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interests
                </label>
                <textarea
                  name="interest"
                  value={resumedata.interest}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                  placeholder="e.g., Web Development, AI, Machine Learning, Sports"
                />
              </div>

              {/* Submit button in this column */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white py-3 px-4 rounded-md hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-md"
                >
                  Build Roadmap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumeBuilderForm;
