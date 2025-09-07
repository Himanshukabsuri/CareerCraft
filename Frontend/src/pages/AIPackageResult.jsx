import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Target,
  BookOpen,
  Lightbulb,
  User,
  Mail,
  School,
  Building2,
  ArrowLeftCircle,
} from "lucide-react";

function AIPackageResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roadmap, user_data } = location.state || {};

  if (!roadmap) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-4xl font-extrabold mb-4 animate-bounce">🚨 No Roadmap Found</h1>
        <p className="text-lg opacity-90">Please submit the form again to generate your career path.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-6 py-3 bg-white/20 backdrop-blur-lg rounded-2xl hover:scale-105 transition"
        >
          ⬅ Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 text-center rounded-b-[3rem] shadow-2xl">
        <h1 className="text-5xl font-extrabold mb-4">🚀 Your Career Roadmap</h1>
        <p className="text-lg opacity-90">Tailored just for <span className="font-bold">{user_data?.name || "You"}</span></p>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20 text-white" fill="currentColor" viewBox="0 0 1440 320">
            <path d="M0,64L48,106.7C96,149,192,235,288,245.3C384,256,480,192,576,170.7C672,149,768,171,864,160C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96V320H0Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-14">
        {/* User Details */}
        <section className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 hover:shadow-2xl transition">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
            <User /> User Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <p><strong><User size={18} className="inline mr-2"/>Name:</strong> {user_data?.name || "N/A"}</p>
            <p><strong><Mail size={18} className="inline mr-2"/>Email:</strong> {user_data?.email || "N/A"}</p>
            <p><strong><School size={18} className="inline mr-2"/>Course:</strong> {user_data?.course || "N/A"}</p>
            <p><strong><Building2 size={18} className="inline mr-2"/>College:</strong> {user_data?.college || "N/A"}</p>
          </div>
        </section>

        {/* Pros & Cons Comparison */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2"><CheckCircle /> Pros</h3>
            <ul className="space-y-2 text-lg">
              {roadmap.pros_cons?.pros?.map((p, i) => <li key={i}>✅ {p}</li>) || <li>No pros available</li>}
            </ul>
          </div>
          <div className="bg-red-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2"><XCircle /> Cons</h3>
            <ul className="space-y-2 text-lg">
              {roadmap.pros_cons?.cons?.map((c, i) => <li key={i}>⚠️ {c}</li>) || <li>No cons available</li>}
            </ul>
          </div>
        </section>

        {/* Goals Timeline */}
        <section className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100">
            <h3 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-2">
              <Target /> Goals
            </h3>
            <div className="relative border-l-4 border-blue-400 pl-10 space-y-7">
              {roadmap.goals?.map((goal, i) => (
                <div key={i} className="relative">
                  {/* timeline dot */}
                  <span className="absolute -left-7 top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-white"></span>
                  <p className="text-lg text-gray-800">{goal}</p>
                </div>
              )) || <p>No goals available</p>}
            </div>
        </section>

        {/* Skills */}
        <section className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100">
          <h3 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-2"><BookOpen /> Skills to Learn</h3>
          <div className="flex flex-wrap gap-4">
            {roadmap.skills_to_learn?.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl shadow hover:scale-105 transition">
                {skill}
              </span>
            )) || <p>No skills listed</p>}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-3xl font-bold text-indigo-700 mb-8 flex items-center gap-2"><Lightbulb /> Project Ideas</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {["beginner", "intermediate", "pro"].map((level, i) => (
              <div key={i} className="p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow hover:shadow-xl border border-gray-100">
                <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700">{level}</span>
                <ul className="mt-4 space-y-2 text-lg">
                  {roadmap.projects?.[level]?.map((p, idx) => <li key={idx}>💡 {p}</li>) || <li>No projects</li>}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        <ArrowLeftCircle size={28}/>
      </button>
    </div>
  );
}

export default AIPackageResult;
