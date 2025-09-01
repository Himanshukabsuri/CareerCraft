import React, { useEffect, useState } from "react";
import { dummyData } from "../assets/assets.js";
import { Sparkles, Gem } from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCreations(dummyData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6 bg-[#F2F7FB]">
      {/* Total Creations Card */}
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Creations */}
      <div className="mt-8">
        <p className="text-lg font-semibold mb-4">Recent Creations</p>

        {loading ? (
          // Shimmer placeholders
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <div
                key={idx}
                className="h-28 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : creations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {creations.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-full flex justify-center items-center text-white">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.subtitle || "Dummy description"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No creations found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
