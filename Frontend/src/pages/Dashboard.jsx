import React, { useEffect, useState } from "react";
import { Sparkles, FileText, Map } from "lucide-react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [resumeHistory, setResumeHistory] = useState([]);
  const [roadmapHistory, setRoadmapHistory] = useState([]);

  const [resumeCount, setResumeCount] = useState(0);
  const [roadmapCount, setRoadmapCount] = useState(0);

  const BASE_URL = "http://127.0.0.1:8000/api/";
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const resumeRes = await fetch(
          `${BASE_URL}resume/history/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const roadmapRes = await fetch(
          `${BASE_URL}roadmap/history/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const resumeData = await resumeRes.json();
        const roadmapData = await roadmapRes.json();

        // ✅ use backend count
        setResumeCount(resumeData.count || 0);
        setRoadmapCount(roadmapData.count || 0);

        setResumeHistory(resumeData.resumes || []);
        setRoadmapHistory(roadmapData.roadmaps || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Merge recent items
  const recentCreations = [
    ...resumeHistory.map((r) => ({
      type: "Resume",
      title: r.student_name,
      date: r.created_at,
    })),
    ...roadmapHistory.map((r) => ({
      type: "Roadmap",
      title: r.student_name,
      date: r.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-6 bg-[#F2F7FB]">
        {/* ===== Count Cards ===== */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {/* Resume Count */}
          <div className="w-72 p-4 bg-white rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Resumes</p>
              <h2 className="text-2xl font-semibold">
                {loading ? "..." : resumeCount}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
          </div>

          {/* Roadmap Count */}
          <div className="w-72 p-4 bg-white rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Roadmaps</p>
              <h2 className="text-2xl font-semibold">
                {loading ? "..." : roadmapCount}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Map size={20} />
            </div>
          </div>
        </div>

        {/* ===== Recent Creations ===== */}
        <div>
          <p className="text-lg font-semibold mb-4">
            Recent Creations
          </p>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : recentCreations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentCreations.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {item.type === "Resume" ? (
                      <FileText size={18} />
                    ) : (
                      <Map size={18} />
                    )}
                  </div>

                  <div>
                    <p className="font-medium">
                      {item.type} Generated
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No creations found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
