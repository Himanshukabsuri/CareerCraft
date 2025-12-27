import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tools from "./components/Tools";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilderForm from "./pages/Resume_builderForm";
import ResumeForm from "./pages/Resume_form";
import AIPackageResult from "./pages/AIPackageResult";
import RoadmapHistory from "./pages/RoadmapHistory";
import ResumeHistory from "./pages/ResumeHistory";
import Login from "./components/Login";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/tools" element={<Tools />} />

      {/* ================= PROTECTED AI ROUTES ================= */}
      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="Resume-builder" element={<ResumeBuilderForm />} />
        <Route path="resume-form" element={<ResumeForm />} />
        <Route path="roadmap-history" element={<RoadmapHistory />} />
        <Route path="resume-history" element={<ResumeHistory />} />
        <Route path="AIPackageResult" element={<AIPackageResult />} />
      </Route>
    </Routes>
  );
};

export default App;
