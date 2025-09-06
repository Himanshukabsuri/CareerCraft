import React from "react";
import { useLocation } from "react-router-dom";

function AIPackageResult() {
  const location = useLocation();
  const { roadmap, user_data } = location.state || {};

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/50">
          <p className="text-2xl text-red-700 font-semibold animate-pulse">
            No roadmap available. Please submit the form again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-indigo-300/20 rounded-full -top-48 -left-48 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-pink-300/20 rounded-full -bottom-48 -right-48 animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 animate-fade-in">
          🎯 Your Personalized Career Roadmap
        </h2>

        <section className="mb-10 bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/50 transform transition-all duration-500 hover:scale-105">
          <h3 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
            <span className="mr-2">👤</span> User Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <p className="text-gray-800"><strong className="text-indigo-700">Name:</strong> {user_data?.name || "N/A"}</p>
            <p className="text-gray-800"><strong className="text-indigo-700">Email:</strong> {user_data?.email || "N/A"}</p>
            <p className="text-gray-800"><strong className="text-indigo-700">Course:</strong> {user_data?.course || "N/A"}</p>
            <p className="text-gray-800"><strong className="text-indigo-700">College:</strong> {user_data?.college || "N/A"}</p>
          </div>
        </section>

        <section className="mb-10 bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/50 transform transition-all duration-500 hover:scale-105">
          <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
            <span className="mr-2">✅</span> Pros
          </h3>
          <ul className="list-none space-y-3">
            {roadmap.pros_cons?.pros?.map((item, idx) => (
              <li key={idx} className="text-gray-800 flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                {item}
              </li>
            )) || <li className="text-gray-600 italic">No pros available</li>}
          </ul>
        </section>

        <section className="mb-10 bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/50 transform transition-all duration-500 hover:scale-105">
          <h3 className="text-2xl font-bold text-red-700 mb-6 flex items-center">
            <span className="mr-2">⚠️</span> Cons
          </h3>
          <ul className="list-none space-y-3">
            {roadmap.pros_cons?.cons?.map((item, idx) => (
              <li key={idx} className="text-gray-800 flex items-start">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                {item}
              </li>
            )) || <li className="text-gray-600 italic">No cons available</li>}
          </ul>
        </section>

        <section className="mb-10 bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/50 transform transition-all duration-500 hover:scale-105">
          <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
            <span className="mr-2">🎯</span> Goals
          </h3>
          <ul className="list-none space-y-3">
            {roadmap.goals?.map((goal, idx) => (
              <li key={idx} className="text-gray-800 flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                {goal}
              </li>
            )) || <li className="text-gray-600 italic">No goals available</li>}
          </ul>
        </section>

        <section className="mb-10 bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/50 transform transition-all duration-500 hover:scale-105">
          <h3 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <span className="mr-2">📚</span> Skills to Learn
          </h3>
          <ul className="list-none space-y-3">
            {roadmap.skills_to_learn?.map((skill, idx) => (
              <li key={idx} className="text-gray-800 flex items-start">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                {skill}
              </li>
            )) || <li className="text-gray-600 italic">No skills listed</li>}
          </ul>
        </section>

        <section className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/50 transform transition-all duration-500 hover:scale-105">
          <h3 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
            <span className="mr-2">💡</span> Project Ideas
          </h3>
          <div className="space-y-8">
            <div>
              <strong className="text-lg text-gray-900">Beginner:</strong>
              <ul className="list-none space-y-3 mt-2">
                {roadmap.projects?.beginner?.map((p, idx) => (
                  <li key={idx} className="text-gray-800 flex items-start">
                    <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3"></span>
                    {p}
                  </li>
                )) || <li className="text-gray-600 italic">No beginner projects available</li>}
              </ul>
            </div>
            <div>
              <strong className="text-lg text-gray-900">Intermediate:</strong>
              <ul className="list-none space-y-3 mt-2">
                {roadmap.projects?.intermediate?.map((p, idx) => (
                  <li key={idx} className="text-gray-800 flex items-start">
                    <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3"></span>
                    {p}
                  </li>
                )) || <li className="text-gray-600 italic">No intermediate projects available</li>}
              </ul>
            </div>
            <div>
              <strong className="text-lg text-gray-900">Pro:</strong>
              <ul className="list-none space-y-3 mt-2">
                {roadmap.projects?.pro?.map((p, idx) => (
                  <li key={idx} className="text-gray-800 flex items-start">
                    <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                    {p}
                  </li>
                )) || <li className="text-gray-600 italic">No pro projects available</li>}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 2s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AIPackageResult;