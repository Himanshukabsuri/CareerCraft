import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    qualification: "",
    college: "",
    course: "",
    branch: "",
    interested_field: "",
    interest: "",
    skill: "",
    education: [{ degree: "", institution: "", start_year: "", end_year: "", grade: "" }],
    projects: [{ title: "", description: "", github: "", live: "" }],
    internships: [{ title: "", company: "", start_date: "", end_date: "" }],
    languages: [{ name: "" }]
  });

  const [pdfUrl, setPdfUrl] = useState(null); // 👈 PDF link

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (e, index, field, key) => {
    const updatedArray = [...formData[field]];
    updatedArray[index][key] = e.target.value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addField = (field, newObj) => {
    setFormData({ ...formData, [field]: [...formData[field], newObj] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Save the resume data
      const saveRes = await axios.post("http://127.0.0.1:8000/api/resume/", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });

      const studentId = saveRes.data.id;

      // 2️⃣ Generate the resume PDF
      const genRes = await axios.post(
        "http://127.0.0.1:8000/api/generate_resume/",
        { student_id: studentId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        }
      );

      setPdfUrl(genRes.data.pdf_url);
      alert("✅ Resume generated successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error generating resume!");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl p-8 rounded-2xl space-y-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        🚀 Resume Builder
      </h2>

      {/* Personal Info */}
      <motion.div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Personal Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name}
            onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
          <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob}
            onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
          <input type="email" name="email" placeholder="Email" value={formData.email}
            onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone}
            onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
        </div>
        <textarea name="address" placeholder="Address" value={formData.address}
          onChange={handleChange} className="border p-3 rounded-lg w-full mt-3 focus:ring-2 focus:ring-indigo-400" />
      </motion.div>

      {/* Online Profiles */}
      <motion.div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Online Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="url" name="linkedin" placeholder="LinkedIn" value={formData.linkedin}
            onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
          <input type="url" name="github" placeholder="GitHub" value={formData.github}
            onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
          <input type="url" name="portfolio" placeholder="Portfolio" value={formData.portfolio}
            onChange={handleChange} className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
        </div>
      </motion.div>

      {/* Education */}
      <motion.div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Degree" value={edu.degree}
              onChange={(e) => handleNestedChange(e, index, "education", "degree")}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
            <input type="text" placeholder="Institution" value={edu.institution}
              onChange={(e) => handleNestedChange(e, index, "education", "institution")}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
            <input type="number" placeholder="Start Year" value={edu.start_year}
              onChange={(e) => handleNestedChange(e, index, "education", "start_year")}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
            <input type="number" placeholder="End Year" value={edu.end_year}
              onChange={(e) => handleNestedChange(e, index, "education", "end_year")}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
          </div>
        ))}
        <button type="button" onClick={() => addField("education", { degree: "", institution: "", start_year: "", end_year: "", grade: "" })}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          <PlusCircle size={18} /> Add Education
        </button>
      </motion.div>

      {/* Skills */}
      <motion.div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Skills</h3>
        <div className="flex gap-2 mb-3 flex-wrap">
          {formData.skill.split(",").filter(s => s.trim() !== "").map((s, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {s.trim()}
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  const skillsArr = formData.skill.split(",").filter(sk => sk.trim() !== "");
                  skillsArr.splice(index, 1);
                  setFormData({ ...formData, skill: skillsArr.join(",") });
                }}
              >
                ❌
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          placeholder="Type a skill and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (e.target.value.trim() !== "") {
                const updatedSkills = formData.skill
                  ? formData.skill + "," + e.target.value.trim()
                  : e.target.value.trim();
                setFormData({ ...formData, skill: updatedSkills });
                e.target.value = "";
              }
            }
          }}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
      </motion.div>

      {/* Internships */}
      <motion.div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">
          Internships / Experience
        </h3>

        {formData.internships.map((exp, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input type="text" placeholder="Title" value={exp.title}
              onChange={(e) => handleNestedChange(e, index, "internships", "title")}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />

            <input type="text" placeholder="Company" value={exp.company}
              onChange={(e) => handleNestedChange(e, index, "internships", "company")}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />

            <input type="date" placeholder="Start Date" value={exp.start_date}
              onChange={(e) => handleNestedChange(e, index, "internships", "start_date")}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />

            <input type="date" placeholder="End Date" value={exp.end_date}
              onChange={(e) => handleNestedChange(e, index, "internships", "end_date")}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addField("internships", { title: "", company: "", start_date: "", end_date: "" })
          }
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          <PlusCircle size={18} /> Add Internship
        </button>
      </motion.div>

      {/* Projects */}
      <motion.div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Projects</h3>
        {formData.projects.map((proj, index) => (
          <div key={index} className="space-y-3 mb-4">
            <input type="text" placeholder="Project Title" value={proj.title}
              onChange={(e) => handleNestedChange(e, index, "projects", "title")}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
            <textarea placeholder="Description" value={proj.description}
              onChange={(e) => handleNestedChange(e, index, "projects", "description")}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
            <input type="url" placeholder="GitHub Link" value={proj.github}
              onChange={(e) => handleNestedChange(e, index, "projects", "github")}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
            <input type="url" placeholder="Live Demo Link" value={proj.live}
              onChange={(e) => handleNestedChange(e, index, "projects", "live")}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400" />
          </div>
        ))}
        <button type="button" onClick={() => addField("projects", { title: "", description: "", github: "", live: "" })}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          <PlusCircle size={18} /> Add Project
        </button>
      </motion.div>

      {/* Languages */}
      <motion.div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Languages</h3>
        {formData.languages.map((lang, index) => (
          <input key={index} type="text" placeholder="Language" value={lang.name}
            onChange={(e) => handleNestedChange(e, index, "languages", "name")}
            className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-400" />
        ))}
        <button type="button" onClick={() => addField("languages", { name: "" })}
          className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
          <PlusCircle size={18} /> Add Language
        </button>
      </motion.div>

      {/* Submit */}
      <div className="text-center">
        <button type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-lg hover:opacity-90">
          Save Resume
        </button>
      </div>

      {/* Show PDF after generation */}
      {pdfUrl && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">Your Generated Resume</h3>
          <iframe
            src={pdfUrl}
            title="Generated Resume"
            className="w-full h-[600px] border rounded-xl shadow-md"
          ></iframe>
          <div className="mt-4">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              📥 Download PDF
            </a>
          </div>
        </div>
      )}
    </motion.form>
  );
};

export default ResumeForm;
