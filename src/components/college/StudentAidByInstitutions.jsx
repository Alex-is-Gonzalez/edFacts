import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const StudentAidBarChart = () => {
  const [aidData, setAidData] = useState([]);

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

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>Total Student Aid by Institution</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={aidData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='institution' stroke='#9CA3AF' tick={{ fill: '#E5E7EB' }} />
            <YAxis stroke='#9CA3AF' tick={{ fill: '#E5E7EB' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey='totalAid' fill='#8B5CF6' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StudentAidBarChart;
