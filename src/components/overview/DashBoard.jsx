import { useState, useEffect } from 'react';
import StatCard from "../stickyComponents/StatCard";
import { Search, Radical, LibraryBig } from 'lucide-react';


const DashBoard = () => {
  const [year, setYear] = useState(2016); // Default year
  const [grade, setGrade] = useState(8); // Default grade
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [schoolFilter, setSchoolFilter] = useState(''); // School filter state
  const [loading, setLoading] = useState(false); // Loading state
  const itemsPerPage = 24; // Number of results per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading when fetching data
      try {
        const response = await fetch(`https://educationdata.urban.org/api/v1/schools/edfacts/assessments/${year}/grade-${grade}/`);
        const result = await response.json();
        setData(result.results);
        setCurrentPage(1); // Reset to first page when year or grade changes
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched or error occurs
      }
    };

    fetchData();
  }, [year, grade]);

  // Filter data by school name
  const filteredData = data
    ? data.filter(school => school.school_name.toLowerCase().includes(schoolFilter.toLowerCase()))
    : [];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <select value={year} onChange={(e) => setYear(e.target.value)} className='bg-gray-700 text-white rounded-lg pl-2 pr-2 py-2'>
          <option value={2016}>2016</option>
          <option value={2017}>2017</option>
          <option value={2018}>2018</option>
          <option value={2019}>2019</option>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          {/* Add more years as needed */}
        </select>
        <select value={grade} onChange={(e) => setGrade(e.target.value)} className='bg-gray-700 text-white rounded-lg pl-2 pr-2 py-2'>
          <option value={3}>Grade 3</option>
          <option value={4}>Grade 4</option>
          <option value={5}>Grade 5</option>
          <option value={6}>Grade 6</option>
          <option value={7}>Grade 7</option>
          <option value={8}>Grade 8</option>
          <option value={9}>Grade 9</option>
       
   
          {/* Add more grades as needed */}
        </select>
        <div className='relative'>
          <input 
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="text" 
            placeholder="Filter by school" 
            value={schoolFilter} 
            onChange={(e) => setSchoolFilter(e.target.value)} 
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
    <div className="text-center text-white animate-bounce">
      Loading data...
    </div>
  </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-4">
            {currentItems && currentItems.map((school, index) => (
              <div key={index}>
                <StatCard
                  name={`${school.school_name} - Math`}
                  value={`${school.math_test_pct_prof_midpt}%`}
                  color="#10B981"
                  icon={Radical}
                />
                <StatCard
                  name={`${school.school_name} - Reading`}
                  value={`${school.read_test_pct_prof_midpt}%`}
                  color="Yellow"
                  icon={LibraryBig}
                />
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between mt-4">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prevPage => prevPage - 1)}
              className="bg-transparent hover:bg-gray-400  text-gray-400 font-semibold hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent text-white rounded-lg"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(prevPage => prevPage + 1)}
              className="bg-transparent hover:bg-gray-400  text-gray-400 font-semibold hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent  text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;


