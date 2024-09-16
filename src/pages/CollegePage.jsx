
import Header from "../components/stickyComponents/Header"

import { motion } from "framer-motion"

import StudentAidScatterPlot from "../components/college/StudentAidScatterPlot"

const CollegePage = () => {
    return (
          <div className='flex-1 overflow-auto relative z-10'>
    <Header title='College Stats' />

    <main className='max-w-7xl mx-auto py-6 px-2 lg:px-8'>
      
{/* <StudentGrantBubbleChart/> */}
        <motion.div   className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 mb-8"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y:0}}
      transition={{duration:1}}
    >
    <div className="p-8">
      <Header title="Aid Recieved by Student Athletes"/>
      <p className="pb-8 pt-8 text-xl">
      The scatter plot visualizes the amount of student aid given to student-athletes (totalAid) across various institutions. Each data point represents an institution, and the position on the X-axis shows the total amount of aid provided by that institution. The Y-axis lists the names of these institutions. The data is paginated, showing 10 institutions at a time You can navigate through the data points by clicking the "Previous" and "Next" buttons to see the next set of institutions and their respective student aid totals. In summary, this scatter plot helps users understand and compare how much student-athlete aid is distributed by different institutions.
      </p>
    </div>
    </motion.div>
       
        <StudentAidScatterPlot />

    </main>
</div>
    )
  
    
  
}

export default CollegePage