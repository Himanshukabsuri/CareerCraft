import React from "react";
import { useLocation } from "react-router-dom";

function AIPackageResult() {
  const location = useLocation();
  const { roadmap, user_data } = location.state || {};

  if (!roadmap) {
    return <p>No roadmap available. Please submit the form again.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🎯 Career Roadmap</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">👤 User Details</h3>
        <p><strong>Name:</strong> {user_data?.name}</p>
        <p><strong>Email:</strong> {user_data?.email}</p>
        <p><strong>Course:</strong> {user_data?.course}</p>
        <p><strong>College:</strong> {user_data?.college}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">✅ Pros</h3>
        <ul className="list-disc pl-6">
          {roadmap.pros_cons?.pros?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">⚠️ Cons</h3>
        <ul className="list-disc pl-6">
          {roadmap.pros_cons?.cons?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">🎯 Goals</h3>
        <ul className="list-disc pl-6">
          {roadmap.goals?.map((goal, idx) => (
            <li key={idx}>{goal}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">📚 Skills to Learn</h3>
        <ul className="list-disc pl-6">
          {roadmap.skills_to_learn?.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold">💡 Project Ideas</h3>
        <div>
          <strong>Beginner:</strong>
          <ul className="list-disc pl-6">
            {roadmap.projects?.beginner?.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Intermediate:</strong>
          <ul className="list-disc pl-6">
            {roadmap.projects?.intermediate?.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Pro:</strong>
          <ul className="list-disc pl-6">
            {roadmap.projects?.pro?.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default AIPackageResult;
