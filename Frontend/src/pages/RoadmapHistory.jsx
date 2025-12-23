import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Map } from "lucide-react";
import Navbar from "../components/Navbar";

const RoadmapHistory = () => {
  const [loading, setLoading] = useState(true);
  const [roadmaps, setRoadmaps] = useState([]);
  const [openId, setOpenId] = useState(null);

  const BASE_URL = "http://127.0.0.1:8000/api/";
  const token = localStorage.getItem("access_token");

  // ===== FETCH ROADMAP HISTORY =====
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch(`${BASE_URL}roadmap/history/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setRoadmaps(data.roadmaps || []);
      } catch (error) {
        console.error("Roadmap history error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  // ===== TOGGLE OPEN / CLOSE =====
  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-6 bg-[#F2F7FB]">
        <h1 className="text-2xl font-semibold mb-6">
          Your Roadmaps
        </h1>

        {/* ===== LOADING ===== */}
        {loading && (
          <p className="text-gray-400">Loading...</p>
        )}

        {/* ===== NO DATA ===== */}
        {!loading && roadmaps.length === 0 && (
          <p className="text-gray-500">No roadmaps found.</p>
        )}

        {/* ===== ROADMAP LIST ===== */}
        <div className="space-y-4">
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap.id}
              className="bg-white rounded-xl shadow-sm p-4"
            >
              {/* ===== HEADER ===== */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleOpen(roadmap.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                    <Map size={20} />
                  </div>

                  <div>
                    <p className="font-medium">
                      Roadmap for {roadmap.student_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(roadmap.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {openId === roadmap.id ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </div>

              {/* ===== DETAILS ===== */}
              {openId === roadmap.id && (
                <div className="mt-4 border-t pt-4 space-y-6">

                  {/* ===== GOALS ===== */}
                  <div>
                    <h3 className="font-semibold mb-2">🎯 Goals</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      {roadmap.roadmap.goals?.map((goal, i) => (
                        <li key={i}>{goal}</li>
                      ))}
                    </ul>
                  </div>

                  {/* ===== SKILLS ===== */}
                  <div>
                    <h3 className="font-semibold mb-2">🛠 Skills to Learn</h3>
                    <div className="flex flex-wrap gap-2">
                      {roadmap.roadmap.skills_to_learn?.map(
                        (skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* ===== PROJECTS ===== */}
                  <div>
                    <h3 className="font-semibold mb-2">🚀 Projects</h3>

                    {Object.entries(
                      roadmap.roadmap.projects || {}
                    ).map(([level, projects]) => (
                      <div key={level} className="mb-4">
                        <p className="font-medium capitalize mb-2">
                          {level}
                        </p>

                        <div className="space-y-3">
                          {projects.map((proj, i) => (
                            <div
                              key={i}
                              className="border rounded-lg p-3 bg-gray-50"
                            >
                              <p className="font-medium">
                                {proj.title}
                              </p>

                              <p className="text-sm text-gray-600">
                                {proj.description}
                              </p>

                              {proj.skills_honed && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {proj.skills_honed.map(
                                    (skill, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                                      >
                                        {skill}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadmapHistory;
