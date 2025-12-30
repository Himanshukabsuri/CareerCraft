import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AtsAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState("ml_engineer");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    setError("");
    setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const getAccessToken = () => {
    return (
      localStorage.getItem("access") ||
      localStorage.getItem("token") ||
      ""
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a PDF resume.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_role", jobRole);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/ats/analyze/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setResult(null);
    setError("");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-10">
            <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1 rounded-full">
              ATS Resume Analyzer
            </span>
            <h1 className="text-3xl font-bold mt-4 text-gray-800">
              Optimize Your Resume for ATS
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Upload your resume and get ATS score, missing keywords and AI-based feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* LEFT CARD */}
            <div className="bg-white border border-gray-900 rounded-2xl shadow-sm p-6">
              <form onSubmit={onSubmit} className="space-y-6">

                {/* JOB ROLE SELECT */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Target Job Role
                  </label>
                  <div className="relative">
                    <select
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      className="
                        appearance-none w-full rounded-lg
                        border border-gray-500 bg-white
                        px-4 py-3 pr-10 text-gray-800
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      "
                    >
                      <option value="ml_engineer">ML Engineer</option>
                      <option value="frontend">Frontend Developer</option>
                      <option value="backend">Backend Developer</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      ▼
                    </span>
                  </div>
                </div>

                {/* FILE UPLOAD */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={onDrop}
                  onClick={() => inputRef.current.click()}
                  className={`cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition
                    ${
                      isDragging
                        ? "border-blue-800 bg-blue-50"
                        : "border-gray-300 hover:border-blue-600"
                    }`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files[0])}
                  />

                  <p className="text-gray-600 text-sm">
                    Drag & drop your resume here or{" "}
                    <span className="text-blue-600 font-medium">browse</span>
                  </p>

                  {file && (
                    <p className="mt-3 text-green-600 text-sm font-medium">
                      ✔ {file.name}
                    </p>
                  )}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3">
                  <button
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                  </button>

                  <button
                    type="button"
                    onClick={resetAll}
                    className="px-5 py-2.5 rounded-lg border border-gray-500 hover:bg-gray-200"
                  >
                    Reset
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-white border border-gray-900 rounded-2xl shadow-sm p-6">
              {!result ? (
                <p className="text-gray-500 text-sm">
                  Results will appear here after analysis.
                </p>
              ) : (
                <div className="space-y-6">

                  {/* SCORE */}
                  <div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>ATS Score</span>
                      <span>{result.ats_score}/100</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full mt-2">
                      <div
                        className={`h-3 rounded-full ${
                          result.ats_score >= 75
                            ? "bg-green-500"
                            : result.ats_score >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${result.ats_score}%` }}
                      />
                    </div>
                  </div>

                  {/* KEYWORDS */}
                  <div>
                    <h4 className="font-semibold mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_keywords?.length ? (
                        result.missing_keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-600"
                          >
                            {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">None 🎉</span>
                      )}
                    </div>
                  </div>

                  {/* AI FEEDBACK */}
                  {result.ai_feedback && (
                    <div>
                      <h4 className="font-semibold mb-2">AI Feedback</h4>
                      <pre className="text-sm bg-gray-100 p-3 rounded-lg whitespace-pre-wrap">
                        {result.ai_feedback}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
