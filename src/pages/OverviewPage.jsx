import Header from "../components/stickyComponents/Header";

import {motion} from "framer-motion"

import DashBoard from "../components/overview/DashBoard";
const OverviewPage = () => {
  return(
    <div className="flex-1 overflow-auto relative z-10">
    <Header title="Overview Of Math and Reading Profiency Rates"/>
    <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
       {/* Top Row */}
    <motion.div   className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 mb-8"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y:0}}
      transition={{duration:1}}
    >
    <div className="p-8">
      <Header title="Overview Of Math and Reading Profiency Rates"/>
      <p className="pb-8 pt-8 text-xl">
        This information is queried from the Urban Institute's Education Data Explorer provides various educational statistics, specifically assessment data for schools in different years and grades. The percentage of students in the school who are proficient in math. This is usually expressed as a midpoint value, representing an average or estimated proficiency rate. In this example: Lincoln Elementary School has a math proficiency rate of 55.4% and a reading proficiency rate of 62.3%. Washington Middle School has a math proficiency rate of 67.8% and a reading proficiency rate of 72.1%. These figures help in assessing how well students in different schools are performing in standardized tests. 
      </p>
    </div>
    </motion.div>
{/*Main Grid*/}
    <div >
   <DashBoard/>
    </div>
    </main>
    </div>
  )
};

export default OverviewPage;
