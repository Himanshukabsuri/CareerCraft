import React, { useEffect, useState } from "react";
import { FileText, Download, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";

const ResumeHistory = () => {
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);

  const BASE_URL = "http://127.0.0.1:8000/api/";
  const token = localStorage.getItem("access_token");

  // ===== FETCH RESUME HISTORY =====
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch(`${BASE_URL}resume/history/`, {
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

      <div className="min-h-screen p-6 bg-[#F2F7FB]">
        <h1 className="text-2xl font-semibold mb-6">
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
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white p-5 rounded-xl shadow-sm flex flex-col gap-4"
            >
              {/* HEADER */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <FileText size={20} />
                </div>

                <div>
                  <p className="font-medium">
                    Resume for {resume.student_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(resume.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* PREVIEW */}
              <p className="text-sm text-gray-700 line-clamp-3">
                {resume.resume_preview}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4">
                <a
                  href={resume.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  <ExternalLink size={16} />
                  View
                </a>

                <a
                  href={resume.pdf_url}
                  download
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResumeHistory;
