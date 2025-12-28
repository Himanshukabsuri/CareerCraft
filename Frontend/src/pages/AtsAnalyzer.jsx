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
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-950 text-gray-900 dark:text-gray-100 pt-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
              <span className="text-xl">📄</span>
              <span className="text-sm font-medium">ATS Resume Analyzer</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">Improve your resume for ATS</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Upload your PDF resume and get keyword coverage, issues, and AI feedback tailored to the selected role.
            </p>
          </div>

          {/* Card */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-slate-900">
              <form onSubmit={onSubmit} className="p-6 space-y-5">
                {/* Job Role */}
                <div>
                  <label className="block mb-2 font-medium">Job Role</label>
                  <select
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="border px-3 py-2 rounded w-full bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 transition
                    ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-gray-300 dark:border-slate-700"}
                    ${file ? "bg-gray-50 dark:bg-slate-800" : "bg-white dark:bg-slate-900"}`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] || null)}
                  />
                  <div className="text-4xl">⬆️</div>
                  <p className="text-sm text-center">
                    Drag & drop your PDF here or{" "}
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="text-blue-600 dark:text-blue-400 font-medium underline"
                    >
                      browse
                    </button>
                  </p>
                  {file && (
                    <div className="mt-3 w-full">
                      <div className="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-slate-800 px-3 py-2">
                        <div className="text-sm truncate">{file.name}</div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="text-xs px-2 py-1 rounded bg-red-500 text-white"
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-60 transition"
                  >
                    {loading ? "Analyzing..." : "Analyze"}
                  </button>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                  >
                    Reset
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>
            </div>

            {/* Results */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-slate-900 p-6">
              {!result ? (
                <div className="text-gray-500 dark:text-gray-400">
                  <p className="font-medium">Results will appear here.</p>
                  <p className="text-sm mt-1">Upload a resume and click Analyze.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Score */}
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">ATS Score</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{result.ats_score}/100</p>
                    </div>
                    <div className="h-3 rounded-full bg-gray-200 dark:bg-slate-800 mt-2">
                      <div
                        className={`h-3 rounded-full ${scoreColor(result.ats_score)} transition-all`}
                        style={{ width: `${Math.min(result.ats_score, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Matched Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {(result.matched_keywords || []).length === 0 ? (
                          <span className="text-sm text-gray-500 dark:text-gray-400">None</span>
                        ) : (
                          (result.matched_keywords || []).map((kw, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200"
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
                          <span className="text-sm text-gray-500 dark:text-gray-400">None</span>
                        ) : (
                          (result.missing_keywords || []).map((kw, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200"
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
                        <li className="text-gray-500 dark:text-gray-400">No issues found.</li>
                      ) : (
                        (result.issues || []).map((i, idx) => <li key={idx}>{i}</li>)
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
                          onClick={() => navigator.clipboard.writeText(result.ai_feedback || "")}
                          className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap text-sm bg-gray-100 dark:bg-slate-800 p-3 rounded mt-2">
                        {result.ai_feedback}
                      </pre>
                    </div>
                  )}

                  {/* File link */}
                  {result.file_url && (
                    <div className="flex items-center justify-between">
                      <a
                        href={result.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline text-sm"
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