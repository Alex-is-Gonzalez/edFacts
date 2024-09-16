import Header from "../components/stickyComponents/Header";

import ElementaryEnrollmentTrendChart from "../components/attendance/ElementaryEnrollmentTrendChart";
import ChronicAbsenteeismChart from "../components/attendance/ChronicAbsenteeismChart";

const AttendancePage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Attendance" />

      <main className=" max-w-25 mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}

        {/* CHARTS */}

        <div className="grid grid-cols-1 md:lg:grid-cols-2 mb-8">
          <div className="p-8">
            <Header title="Aid Recieved by Student Athletes" />
            <p className="pb-8 pt-8 text-xl">
              The scatter plot visualizes the amount of student aid given to
              student-athletes (totalAid) across various institutions. Each data
              point represents an institution, and the position on the X-axis
              shows the total amount of aid provided by that institution. The
              Y-axis lists the names of these institutions. The data is
              paginated, showing 10 institutions at a time You can navigate
              through the data points by clicking the "Previous" and "Next"
              buttons to see the next set of institutions and their respective
              student aid totals. In summary, this scatter plot helps users
              understand and compare how much student-athlete aid is distributed
              by different institutions.
            </p>
          </div>
          <ElementaryEnrollmentTrendChart />
        </div>

        <div className="grid grid-cols-1 md:lg:grid-cols-2 mb-8">
          <div className="p-8">
            <Header title="Aid Recieved by Student Athletes" />
            <p className="pb-8 pt-8 text-xl">
              The scatter plot visualizes the amount of student aid given to
              student-athletes (totalAid) across various institutions. Each data
              point represents an institution, and the position on the X-axis
              shows the total amount of aid provided by that institution. The
              Y-axis lists the names of these institutions. The data is
              paginated, showing 10 institutions at a time You can navigate
              through the data points by clicking the "Previous" and "Next"
              buttons to see the next set of institutions and their respective
              student aid totals. In summary, this scatter plot helps users
              understand and compare how much student-athlete aid is distributed
              by different institutions.
            </p>
          </div>
          <ChronicAbsenteeismChart />
        </div>
      </main>
    </div>
  );
};
export default AttendancePage;
