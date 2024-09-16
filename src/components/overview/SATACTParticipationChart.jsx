import { motion } from "framer-motion";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell
} from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const SATACTParticipationChart = () => {
    const [data, setData] = useState([]);
    const years = [2011, 2013, 2015, 2017, 2020];

    const fetchParticipationData = async () => {
        try {
            const results = await Promise.all(
                years.map(year => 
                    axios.get(`https://educationdata.urban.org/api/v1/schools/crdc/sat-act-participation/${year}/race/sex/`)
                )
            );

            const aggregatedData = results.map((response, index) => {
                if (response.data.results) {
                    // Aggregate total participation counts
                    const totalParticipation = response.data.results.reduce((acc, item) => acc + item.participation, 0);
                    
                    return { year: years[index], total: totalParticipation };
                } else {
                    console.error("Invalid data structure:", response.data);
                    return { year: years[index], total: 0 }; // Default to 0 if invalid
                }
            });

            setData(aggregatedData);
        } catch (error) {
            console.error("Error fetching participation data:", error.response ? error.response.data : error.message);
            setData([]); // Reset data if error occurs
        }
    };

    useEffect(() => {
        fetchParticipationData();
    }, []);

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>SAT/ACT Participation by Year</h2>

            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid stroke='#374151' />
                        <XAxis dataKey='year' stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                        <Bar dataKey='total' fill='#8B5CF6'>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill='#8B5CF6' />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default SATACTParticipationChart;



