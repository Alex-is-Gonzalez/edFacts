import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const StudentAidPieChart = () => {
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

  const COLORS = ['#8B5CF6', '#9CA3AF', '#4B5563', '#E5E7EB', '#374151'];

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>Student Aid Distribution</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={aidData}
              dataKey='totalAid'
              nameKey='institution'
              outerRadius={120}
              fill='#8B5CF6'
              label={({ name }) => name}
            >
              {aidData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StudentAidPieChart;
