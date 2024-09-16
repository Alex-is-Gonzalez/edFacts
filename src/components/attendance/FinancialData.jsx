import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const FinancialTrendChart = () => {
	const [grade, setGrade] = useState(3); // Default grade is set to 3
	const [financialData, setFinancialData] = useState([]);

	const fetchFinancialData = async (grade) => {
		const currentYear = new Date().getFullYear();
		const startYear = currentYear - 10; // Last ten years
		let data = [];

		for (let year = startYear; year <= currentYear; year++) {
			try {
				// Replace with the correct endpoint for financial data
				const response = await axios.get(
					`https://educationdata.urban.org/api/v1/schools/ccd/finance/${year}/grade-${grade}/`
				);

				// Log the response to understand its structure
				console.log(`Financial data for year ${year}:`, response.data);

				// Assuming the response has a `results` array with financial fields (e.g., revenue, expenditure)
				const yearData = response.data.results.reduce((acc, item) => {
					return acc + item.expenditure; // Adjust according to the API response structure
				}, 0); // Sum up expenditure or another financial metric for the year

				data.push({ year, expenditure: yearData });
			} catch (error) {
				console.error(`Error fetching financial data for ${year}:`, error);
			}
		}
		setFinancialData(data);
	};

	useEffect(() => {
		fetchFinancialData(grade);
	}, [grade]);

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Financial Trend (Last 10 Years)</h2>
			
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
					<LineChart data={financialData}>
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
						<Line type='monotone' dataKey='expenditure' stroke='#8B5CF6' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default FinancialTrendChart;
