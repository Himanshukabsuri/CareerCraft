import React, { useEffect, useState } from "react";
import { FileText, Download, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";
import BASE_URL from "../components/Api";
const ResumeHistory = () => {
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);

  const BASE = `${BASE_URL}/api/`;
  const token = localStorage.getItem("access_token");

  // ===== FETCH RESUME HISTORY =====
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch(`${BASE}resume/history/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setResumes(data.resumes || []);
      } catch (error) {
        console.error("Resume history error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <>
      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="min-h-screen bg-[#F2F7FB] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-center mt-10">
            Your Resume History
          </h1>

          {/* ===== LOADING ===== */}
          {loading && (
            <p className="text-gray-400">Loading...</p>
          )}

          {/* ===== NO DATA ===== */}
          {!loading && resumes.length === 0 && (
            <p className="text-gray-500">
              No resumes found.
            </p>
          )}

          {/* ===== RESUME LIST ===== */}
          <div className="space-y-5">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <FileText size={22} />
                  </div>

                  <div>
                    <p className="font-medium text-lg">
                      Resume for {resume.student_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(resume.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 justify-end">
                  <a
                    href={resume.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-blue-700 w-32"
                  >
                    <ExternalLink size={16} />
                    View
                  </a>

                  <a
                    href={resume.pdf_url}
                    download
                    className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-green-700 w-32"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeHistory;
