import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const ElementaryEnrollmentTrendChart = () => {
	const [grade, setGrade] = useState(3); // Default grade is set to 3
	const [enrollmentData, setEnrollmentData] = useState([]);

	const fetchEnrollmentData = async (grade) => {
		const currentYear = new Date().getFullYear();
		const startYear = currentYear - 10; // Last ten years
		let data = [];

		for (let year = startYear; year <= currentYear; year++) {
			try {
				const response = await axios.get(
					`https://educationdata.urban.org/api/v1/schools/ccd/enrollment/${year}/grade-${grade}/`
				);

				// Assuming the response has a `results` array with an `enrollment` field
				const yearData = response.data.results.reduce((acc, item) => {
					return acc + item.enrollment;
				}, 0); // Sum up enrollment for the year

				data.push({ year, enrollment: yearData });
			} catch (error) {
				console.error(`Error fetching enrollment data for ${year}:`, error);
			}
		}
		setEnrollmentData(data);
	};

	useEffect(() => {
		fetchEnrollmentData(grade);
	}, [grade]);

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Enrollment Trend (Last 10 Years)</h2>
			
			{/* Grade Selector */}
			<div className='mb-4'>
				<label className='text-gray-100 ml-4 mr-2'>Select Grade:</label>
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
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={enrollmentData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
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
						<Line type='monotone' dataKey='enrollment' stroke='#8B5CF6' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default ElementaryEnrollmentTrendChart;



