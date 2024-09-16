import { motion } from "framer-motion";
import Header from "../components/stickyComponents/Header";
import HighSchoolEnrollmentTrendChart from "../components/highschool/HighSchoolEnrollmentTrendChart"

import RaceDistributionChart from "../components/highschool/RaceDistributionChart";
const HighSchoolPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
			<Header title='College Stats' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
				<RaceDistributionChart/>	
                <HighSchoolEnrollmentTrendChart/>
				</motion.div>

			

				{/* CHARTS */}
				<div className=' gap-8'>
				
				
			
			

				</div>
			</main>
		</div>
  )
}

export default HighSchoolPage