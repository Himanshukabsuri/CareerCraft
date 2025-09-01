import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function ResumeBuilderForm() {
  const [resumedata, setResumedata] = useState({
    name: "",
    address: "",
    dob: "",
    email: "",
    lastQualification: "",
    currentCourse: "",
    branch: "",
    currentSem: "",
    college: "",
    skill: "",
    interest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumedata({ ...resumedata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", resumedata);
  };

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        .resume-form-container {
          display: flex;
          justify-content: center;
          padding: 20px;
          
        }
        .resume-form {
          width: 400px;
          background: #f9f9f9;
          padding: 20px 25px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        .resume-form h3 {
          text-align: center;
          margin-bottom: 15px;
        }
        .resume-form h5 {
          margin-top: 15px;
          margin-bottom: 8px;
          color: #333;
        }
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .form-section label {
          font-weight: bold;
          font-size: 14px;
        }
        .form-section input,
        .form-section select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .submit-btn {
          margin-top: 15px;
          width: 100%;
          padding: 10px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .submit-btn:hover {
          background: #45a049;
        }
      `}</style>
       
      <div className="resume-form-container">
        <form onSubmit={handleSubmit} className="resume-form">
          <h3>Resume Builder</h3>

          <h5>Personal Details</h5>
          <div className="form-section">
            <label>Name</label>
            <input type="text" name="name" value={resumedata.name} onChange={handleChange} />

            <label>Address</label>
            <input type="text" name="address" value={resumedata.address} onChange={handleChange} />

            <label>DOB</label>
            <input type="date" name="dob" value={resumedata.dob} onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" value={resumedata.email} onChange={handleChange} />
          </div>

          <h5>Education</h5>
          <div className="form-section">
            <label>Last Qualification</label>
             <select name="lastQualification" value={resumedata.lastQualification} onChange={handleChange}>
              <option value="">-- Select Course --</option>
              <option value="12-PCM">12-PCm</option>
              <option value="12-PCB">12-PCB</option>
              <option value="12-ARTS">12-ARTS</option>
              <option value="12-Commarce">12-Cammarce</option>
              
            </select>
            <label>Current Course</label>
            <select name="currentCourse" value={resumedata.currentCourse} onChange={handleChange}>
              <option value="">-- Select Course --</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="BSC">BSC</option>
              <option value="B.Com">B.Com</option>
              <option value="B.A">B.A</option>
            </select>

            {/* Branch only if B.Tech */}
            {resumedata.currentCourse === "B.Tech" && (
              <>
                <label>Branch</label>
                <select name="branch" value={resumedata.branch} onChange={handleChange}>
                  <option value="">-- Select Branch --</option>
                  <option value="CSE">Computer Science</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Civil">Civil</option>
                  <option value="ECE">Electronics and Communication</option>
                  <option value="EE">Electrical and Electronics</option>
                </select>
              </>
            )}

            <label>Current Semester</label>
            <select name="currentSem" value={resumedata.currentSem} onChange={handleChange}>
              <option value="">-- Select Semester --</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>

            <label>College</label>
            <input type="text" name="college" value={resumedata.college} onChange={handleChange} />
          </div>

          <h5>Skills</h5>
          <div className="form-section">
            <label>Skill</label>
            <input type="text" name="skill" value={resumedata.skill} onChange={handleChange} />

            <label>Interest</label>
            <input type="text" name="interest" value={resumedata.interest} onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default ResumeBuilderForm;
