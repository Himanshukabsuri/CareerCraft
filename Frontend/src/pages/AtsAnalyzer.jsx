import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loading";
import Sidebar from "../components/Sidebar";

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
    e.stopPropagation();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  const getAccessToken = () => {
    const candidates = [
      "access",
      "token",
      "access_token",
      "authTokens",
      "auth",
      "user",
    ];
    for (const key of candidates) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        if (raw.startsWith("{")) {
          const obj = JSON.parse(raw);
          return (
            obj.access ||
            obj.token ||
            obj.access_token ||
            obj?.tokens?.access ||
            obj?.user?.access ||
            ""
          );
        }
        return raw;
      } catch {
        return raw;
      }
    }
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }
    const form = new FormData();
    form.append("file", file);
    form.append("job_role", jobRole);

    setLoading(true);
    try {
      const token = getAccessToken();
      const res = await fetch("http://127.0.0.1:8000/api/ats/analyze/", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      });
      const data = await res.json();
      if (res.status === 401) {
        setError("Unauthorized. Please login again.");
        return;
      }
      if (!res.ok) throw new Error(data?.error || "Failed to analyze");
      setResult(data);
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setResult(null);
    setError("");
    setLoading(false);
  };

  const scoreColor = (s) => {
    if (s >= 75) return "bg-green-500";
    if (s >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <>
      <Navbar />
      {loading && <Loader />}

      <Sidebar />

      {/* 🔽 ONLY BACKGROUND COLOR CHANGED HERE */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900 pt-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 text-blue-700">
              <span className="text-xl">📄</span>
              <span className="text-sm font-medium">ATS Resume Analyzer</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">
              Improve your resume for ATS
            </h1>
            <p className="text-gray-600 mt-2">
              Upload your PDF resume and get keyword coverage, issues, and AI
              feedback tailored to the selected role.
            </p>
          </div>

          {/* Card */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-600 bg-white/90 backdrop-blur shadow-lg hover:shadow-xl transition">
              <form onSubmit={onSubmit} className="p-6 space-y-6">
                {/* Job Role */}
                <div>
                  <label className="block mb-2 font-medium">Job Role</label>
                  <select
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
             transition shadow-sm"
                  >
                    <option value="ml_engineer">ML Engineer</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                  </select>
                </div>

                {/* Dropzone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={onDrop}
                  className={`relative flex flex-col items-center justify-center gap-3 rounded-xl
    border-2 border-dashed p-8 text-center transition-all duration-300
    ${
      isDragging
        ? "border-blue-500 bg-blue-50 scale-[1.02]"
        : "border-gray-300 hover:border-blue-400"
    }
    ${file ? "bg-slate-50" : "bg-white"}`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] || null)}
                  />
                  <div className="text-5xl text-blue-500 animate-pulse">
                    ⬆️
                  </div>

                  <p className="text-sm text-gray-600">
                    Drag & drop your PDF here or{" "}
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="font-semibold text-blue-600 hover:text-blue-700 underline"
                    >
                      browse
                    </button>
                  </p>

                  {file && (
                    <div className="mt-3 w-full">
                      <div className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3 shadow-sm">
                        <div className="text-sm truncate">{file.name}</div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="text-xs px-3 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600
             hover:from-blue-700 hover:to-indigo-700
             text-white px-6 py-2 rounded-lg shadow-md
             disabled:opacity-60 transition"
                  >
                    {loading ? "Analyzing..." : "Analyze"}
                  </button>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="px-4 py-2 rounded-lg border border-gray-300
             hover:bg-gray-100 transition shadow-sm"
                  >
                    Reset
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>
            </div>

            {/* Results */}
            <div className="rounded-2xl border border-gray-600 bg-white/95 backdrop-blur p-6 shadow-lg">
              {!result ? (
                <div className="text-gray-500">
                  <p className="font-medium">Results will appear here.</p>
                  <p className="text-sm mt-1">
                    Upload a resume and click Analyze.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Score */}
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">ATS Score</p>
                      <p className="text-sm text-gray-500">
                        {result.ats_score}/100
                      </p>
                    </div>
                    <div className="h-3 rounded-full bg-gray-200 mt-2 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${scoreColor(
                          result.ats_score
                        )}`}
                        style={{
                          width: `${Math.min(result.ats_score, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Matched Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {(result.matched_keywords || []).length === 0 ? (
                          <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 shadow-sm">
                            None
                          </span>
                        ) : (
                          (result.matched_keywords || []).map((kw, i) => (
                            <span
                              key={i}
                              className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 shadow-sm"
                            >
                              {kw}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Missing Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {(result.missing_keywords || []).length === 0 ? (
                          <span className="text-sm text-gray-500">None</span>
                        ) : (
                          (result.missing_keywords || []).map((kw, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700"
                            >
                              {kw}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Issues */}
                  <div>
                    <p className="font-semibold mb-2">Issues</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {(result.issues || []).length === 0 ? (
                        <li className="text-gray-500">No issues found.</li>
                      ) : (
                        (result.issues || []).map((i, idx) => (
                          <li key={idx}>{i}</li>
                        ))
                      )}
                    </ul>
                  </div>

                  {/* AI Feedback */}
                  {result.ai_feedback && (
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">AI Feedback</p>
                        <button
                          type="button"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              result.ai_feedback || ""
                            )
                          }
                          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 transition"
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap text-sm bg-slate-100 p-4 rounded-lg mt-2 border border-slate-200 shadow-inner">
                        {result.ai_feedback}
                      </pre>
                    </div>
                  )}

                  {result.file_url && (
                    <div className="flex items-center justify-between">
                      <a
                        href={result.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        View uploaded PDF
                      </a>
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
