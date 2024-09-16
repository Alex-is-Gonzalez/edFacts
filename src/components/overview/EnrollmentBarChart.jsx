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
    Cell,
} from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const EnrollmentBarChart = () => {
    const [grade, setGrade] = useState(3); // Default grade
    const [enrollmentData, setEnrollmentData] = useState([]);

    const fetchEnrollmentData = async (grade) => {
        try {
            const response = await axios.get(
                `https://educationdata.urban.org/api/v1/schools/ccd/enrollment/2023/grade-${grade}/race/sex/` // Adjust year as needed
            );

            if (response.data.results) {
                const data = response.data.results
                    .filter(item => [1, 2, 3, 4, 20].includes(item.race)) // Filter for relevant races
                    .map(item => ({
                        name: getRaceName(item.race),
                        value: item.enrollment,
                    }));
                setEnrollmentData(data);
            } else {
                console.error("Invalid data structure:", response.data);
                setEnrollmentData([]); // Reset data if invalid
            }
        } catch (error) {
            console.error("Error fetching enrollment data:", error.response ? error.response.data : error.message);
            setEnrollmentData([]); // Reset data if error occurs
        }
    };

    // Helper function to convert race code to readable name
    const getRaceName = (raceCode) => {
        const raceMap = {
            1: "White",
            2: "Black",
            3: "Hispanic",
            4: "Asian",
            20: "Other",
        };
        return raceMap[raceCode] || "Unknown";
    };

    useEffect(() => {
        fetchEnrollmentData(grade);
    }, [grade]);

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            <h2 className='text-xl font-semibold text-gray-100 mb-4'>Enrollment by Race</h2>

            {/* Grade Selector */}
            <div className='mb-4'>
                <label className='text-gray-100 mr-2'>Select Grade:</label>
                <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className='bg-gray-700 text-white rounded-lg px-3 py-2'
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            Grade {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={enrollmentData}>
                        <CartesianGrid stroke='#374151' />
                        <XAxis dataKey='name' stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                        <Bar dataKey='value' fill='#8B5CF6'>
                            {enrollmentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill='#8B5CF6' />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default EnrollmentBarChart;

