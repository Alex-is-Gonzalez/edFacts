import { motion } from "framer-motion";

// const StatCard = ({ name, icon: Icon, value, color }) => {
//   return (
//     <motion.div
//       className="stat-card bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
//       whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
//     >
//       <div className="px-4 py-5 sm:p-6 flex flex-col justify-between h-full">
//         <span className="flex items-center text-sm font-medium text-gray-400">
//           <Icon size={20} className="mr-2" style={{ color: color }} />
//           {/* Limit to one line and handle overflow */}
//           <span className="truncate">{name}</span>
//         </span>
//         <p className="mt-1 text-3xl font-semibold text-gray-100">{value}</p>
//       </div>
//     </motion.div>
//   );
// };

const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      style={{ minHeight: '100px' }} // Set a minimum height for the cards
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-400">
          <Icon size={20} className="mr-2" style={{ color: color }} />
          <span className="truncate">{name}</span> {/* Ensure truncation */}
        </span>
        <p className="mt-1 text-3xl font-semibold text-gray-100">{value}</p>
      </div>
    </motion.div>
  );
};


export default StatCard;
