import { useEffect, useState } from "react";
import axios from "axios";
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const StudentAidScatterPlot = () => {
  const [aidData, setAidData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const pageSize = 10; // Number of data points per page

  const fetchAidData = async () => {
    try {
      const response = await axios.get(
        `https://educationdata.urban.org/api/v1/college-university/eada/institutional-characteristics/summaries?var=ath_stuaid_total&stat=sum&by=inst_name`
      );
      const data = response.data.results.map(item => ({
        institution: item.inst_name,
        totalAid: item.ath_stuaid_total,
      }));

      setAidData(data);
    } catch (error) {
      console.error("Error fetching student aid data:", error);
    }
  };

  useEffect(() => {
    fetchAidData();
  }, []);

  // Calculate paginated data
  const paginatedData = aidData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  // Handle pagination control
  const handleNext = () => {
    if ((currentPage + 1) * pageSize < aidData.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 my-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>Athlete Student Aid Scatter Plot</h2>

      <div style={{ width: "100%", height: 900 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis type="number" dataKey="totalAid" stroke='#9CA3AF' />
            <YAxis type="category" dataKey="institution" stroke='#9CA3AF' tick={{ angle: -48, textAnchor: "center" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Scatter data={paginatedData} fill='#F59E0B' />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50"
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button 
          onClick={handleNext}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50"
          disabled={(currentPage + 1) * pageSize >= aidData.length}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default StudentAidScatterPlot;


