import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const ChronicAbsenteeismLineChart = () => {
  const [absenteeData, setAbsenteeData] = useState([]);

  const fetchAbsenteeData = async () => {
    try {
      const response = await axios.get(
        `https://educationdata.urban.org/api/v1/schools/crdc/chronic-absenteeism/summaries?var=students_chronically_absent&stat=count&by=homeless`
      );
      const data = response.data.results.map(item => ({
        year: item.year,
        absentee: item.students_chronically_absent,
      }));

      setAbsenteeData(data);
    } catch (error) {
      console.error("Error fetching chronic absenteeism data:", error);
    }
  };

  useEffect(() => {
    fetchAbsenteeData();
  }, []);

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mt-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>Chronic Absenteeism Trend</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={absenteeData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis
              dataKey='year'
              stroke='#9CA3AF'
              tick={{ fill: '#E5E7EB' }}
              tickSize={10}
              tickMargin={10}
          
            />
            <YAxis stroke='#9CA3AF' tick={{ fill: '#E5E7EB' }} 
                tickCount={8}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Line type='monotone' dataKey='absentee' stroke='#8B5CF6' strokeWidth={2} name="Chronic Absenteeism" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ChronicAbsenteeismLineChart;


// [dataset names], via Education Data Portal v. 0.22.0, Urban Institute, under ODC Attribution License.