import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState("");
    React.useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/aboutus/");
        const data = await response.json();
        if (response.ok) {
          setAboutData(data);
        } else {
          setError(data.error || "Failed to fetch about us data");
        }
        } catch (err) {
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
        {/* PAGE WRAPPER */}
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 pt-16 mt-10">
            {/* HERO SECTION */}
            <div className="bg-blue-600 dark:bg-blue-800 py-10 text-center">
                <h1 className="text-3xl font-bold text-white">About Us</h1>
                <p className="text-blue-100 mt-2 text-sm">
                    Learn more about our mission and team.
                </p>
            </div>
            {/* ABOUT US CONTENT */}

            <div className="max-w-4xl mx-auto p-6">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : aboutData ? (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">{aboutData.app_name}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            v{aboutData.version}
                        </p>
                        <p className="mb-4">{aboutData.description}</p>

                        <h3 className="text-xl font-semibold">Features</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {(aboutData.features ?? []).map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-semibold">Team</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {(aboutData.team ?? []).map((member, i) => (
                                <li key={i}>
                                    <strong>{member.name}</strong> — {member.role}
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-semibold">Contact</h3>
                        <p>Email: {aboutData.contact_email}</p>
                        <p>Website: {aboutData.website}</p>
                    </div>
                ) : (  
                    <p>No about us data available.</p>
                )}
            </div>
        </div>
      <Footer />
    </>
  );
}

export default AboutUs;