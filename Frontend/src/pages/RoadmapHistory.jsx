import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Map } from "lucide-react";
import Navbar from "../components/Navbar";

const RoadmapHistory = () => {
  const [loading, setLoading] = useState(true);
  const [roadmaps, setRoadmaps] = useState([]);
  const [openId, setOpenId] = useState(null);

  const BASE_URL = "http://127.0.0.1:8000/api/";
  const token = localStorage.getItem("access_token");

  // ================= FETCH ROADMAP HISTORY =================
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch(`${BASE_URL}roadmap/history/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setRoadmaps(Array.isArray(data?.roadmaps) ? data.roadmaps : []);
      } catch (error) {
        console.error("Roadmap history error:", error);
        setRoadmaps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  // ================= TOGGLE =================
  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-6 bg-[#F2F7FB] mt-15">
        <h1 className="text-2xl font-semibold mb-6 text-center">Your Roadmaps</h1>

        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading && roadmaps.length === 0 && (
          <p className="text-gray-500">No roadmaps found.</p>
        )}

        <div className="space-y-4">
          {roadmaps.map((roadmap) => {
            const roadmapData = roadmap?.roadmap || {};

            return (
              <div
                key={roadmap.id}
                className="bg-white rounded-xl shadow-sm p-4"
              >
                {/* ================= HEADER ================= */}
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
                        Roadmap for {roadmap.student_name || "Student"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {roadmap.created_at
                          ? new Date(
                              roadmap.created_at
                            ).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {openId === roadmap.id ? <ChevronUp /> : <ChevronDown />}
                </div>

                {/* ================= DETAILS ================= */}
                {openId === roadmap.id && (
                  <div className="mt-4 border-t pt-4 space-y-6">

                    {/* ================= GOALS ================= */}
                    {Array.isArray(roadmapData.goals) && (
                      <div>
                        <h3 className="font-semibold mb-2">🎯 Goals</h3>

                        <div className="space-y-4">
                          {roadmapData.goals.map((goal, i) => {
                            // STRING GOALS
                            if (typeof goal === "string") {
                              return (
                                <li
                                  key={i}
                                  className="list-disc ml-6 text-gray-700"
                                >
                                  {goal}
                                </li>
                              );
                            }

                            // OBJECT GOALS
                            if (
                              typeof goal === "object" &&
                              goal !== null
                            ) {
                              return (
                                <div
                                  key={i}
                                  className="border rounded-lg p-3 bg-gray-50"
                                >
                                  <p className="font-medium">
                                    {goal.level}
                                  </p>

                                  <p className="text-sm text-gray-600 mt-1">
                                    {goal.description}
                                  </p>

                                  {Array.isArray(
                                    goal.specific_actions
                                  ) && (
                                    <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
                                      {goal.specific_actions.map(
                                        (action, idx) => (
                                          <li key={idx}>
                                            {action}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                </div>
                              );
                            }

                            return null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* ================= SKILLS ================= */}
                    {Array.isArray(roadmapData.skills_to_learn) && (
                      <div>
                        <h3 className="font-semibold mb-2">
                          🛠 Skills to Learn
                        </h3>

                        <div className="space-y-4">
                          {roadmapData.skills_to_learn.map(
                            (skillItem, i) => {
                              // STRING SKILLS
                              if (typeof skillItem === "string") {
                                return (
                                  <span
                                    key={i}
                                    className="inline-block mr-2 mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                  >
                                    {skillItem}
                                  </span>
                                );
                              }

                              // OBJECT SKILLS
                              if (
                                typeof skillItem === "object" &&
                                skillItem !== null
                              ) {
                                return (
                                  <div key={i}>
                                    <p className="font-medium mb-1">
                                      {skillItem.category}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {Array.isArray(
                                        skillItem.skills
                                      ) &&
                                        skillItem.skills.map(
                                          (s, idx) => (
                                            <span
                                              key={idx}
                                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                            >
                                              {s}
                                            </span>
                                          )
                                        )}
                                    </div>
                                  </div>
                                );
                              }

                              return null;
                            }
                          )}
                        </div>
                      </div>
                    )}

                    {/* ================= PROJECTS ================= */}
                    {roadmapData.projects &&
                      typeof roadmapData.projects === "object" && (
                        <div>
                          <h3 className="font-semibold mb-2">
                            🚀 Projects
                          </h3>

                          {Object.entries(roadmapData.projects).map(
                            ([level, projects]) =>
                              Array.isArray(projects) && (
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

                                        {Array.isArray(
                                          proj.skills_honed
                                        ) && (
                                          <div className="flex flex-wrap gap-2 mt-2">
                                            {proj.skills_honed.map(
                                              (skill, idx) => (
                                                <span
                                                  key={idx}
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
                              )
                          )}
                        </div>
                      )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RoadmapHistory;
