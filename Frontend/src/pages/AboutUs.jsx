import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/aboutus/");
        const data = await response.json();

        if (response.ok) {
          setAboutData(data);
        } else {
          setError(data.error || "Failed to load About Us data");
        }
      } catch {
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <>
      <Navbar />

      {/* ===== PAGE WRAPPER ===== */}
      <div className="min-h-screen bg-white pt-24">

        {/* ===== HERO SECTION ===== */}
        <section className="relative py-24 px-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            About Us
          </h1>
          <p className="text-blue-100/90 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Learn more about our mission, values, and the team building the future
            of AI-powered career tools.
          </p>
        </section>

        {/* ===== MAIN CONTENT ===== */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          {loading && (
            <p className="text-center text-gray-500">Loading information...</p>
          )}

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {aboutData && (
            <div className="space-y-24">

              {/* ===== APP INFO ===== */}
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                  {aboutData.app_name}
                </h2>
                <p className="text-gray-500 mt-1">
                  Version {aboutData.version}
                </p>
                <p className="mt-10 max-w-3xl mx-auto text-gray-600 leading-relaxed text-[15px]">
                  {aboutData.description}
                </p>
              </div>

              {/* ===== FEATURES ===== */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">
                  Key Features
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(aboutData.features ?? []).map((feature, index) => (
                    <div
                      key={index}
                      className="
                        bg-white
                        border border-gray-600/250
                        rounded-2xl p-7
                        shadow-[0_1px_2px_rgba(0,0,0,0.02)]
                        hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]
                        transition-all duration-300
                      "
                    >
                      <div className="w-11 h-11 mb-4 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <p className="text-gray-700 font-medium text-sm">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ===== TEAM ===== */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">
                  Our Team
                </h3>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {(aboutData.team ?? []).map((member, index) => (
                    <div
                      key={index}
                      className="
                        bg-white
                        border border-gray-600/80
                        rounded-3xl p-8
                        text-center
                        shadow-[0_1px_2px_rgba(0,0,0,0.02)]
                        hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                        transition-all duration-300
                      "
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 ring-4 ring-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-700">
                        {member.name.charAt(0)}
                      </div>

                      <h4 className="font-semibold text-gray-900">
                        {member.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {member.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ===== CONTACT ===== */}
              <div
                className="
                  bg-gray-50
                  border border-gray-500/250
                  rounded-3xl p-12
                  text-center
                "
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Get in Touch
                </h3>
                <p className="text-gray-700 text-[15px] mb-2">
                  📧 {aboutData.contact_email}
                </p>
                <p className="text-gray-700 text-[15px]">
                  🌐 {aboutData.website}
                </p>
              </div>

            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
