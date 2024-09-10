import { useState } from "react";
import { AiOutlineExport } from "react-icons/ai";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";
import Chart from "react-apexcharts";

const chartConfig = {
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: {
      type: "bar" as "bar", // Explicitly cast as a valid chart type
      height: 240,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    colors: ["#020617"],
    plotOptions: {
      bar: { columnWidth: "40%", borderRadius: 2 },
    },
    xaxis: {
      categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: { style: { colors: "#616161", fontSize: "12px" } },
    },
    yaxis: {
      labels: { style: { colors: "#616161", fontSize: "12px" } },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
    },
    tooltip: { theme: "dark" },
  },
};

const ProductAnalysisDetailPage = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const handleOpenSidenav = () => setIsSidenavOpen(true);
  const handleCloseSidenav = () => setIsSidenavOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-semibold">Product Analysis</h1>
            <button
              onClick={handleOpenSidenav}
              className="bg-yellow-500 text-white px-3 py-2 rounded-md flex items-center"
            >
              <AiOutlineExport /> Export Analysis
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-300 rounded-md p-4 w-full mb-6">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search Products"
                className="border border-blue-300 rounded-md px-3 py-2 w-full max-w-xs"
              />
              <select className="border border-blue-300 rounded-md px-3 py-2 ml-2">
                <option value="">Sort By</option>
                <option value="gross-sales">Gross Sales</option>
                <option value="net-profit">Net Profit</option>
                <option value="units-sold">Units Sold</option>
                <option value="stock-level">Stock Level</option>
              </select>
            </div>
          </div>

          {/* Graph Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-300 rounded-md p-4">
              <h2 className="text-lg font-semibold mb-2">Sales Overview</h2>
              <Chart options={chartConfig.options} series={chartConfig.series} type="bar" height={240} />
            </div>

            <div className="bg-white border border-gray-300 rounded-md p-4">
              <h2 className="text-lg font-semibold mb-2">Product Performance</h2>
              <Chart options={chartConfig.options} series={chartConfig.series} type="bar" height={240} />
            </div>
          </div>
        </main>
      </div>

      {/* Sidenav for Export Analysis */}
      {isSidenavOpen && (
        <div className="bg-gray-800 opacity-50 w-full h-full fixed z-10" onClick={handleCloseSidenav}>
          <div className="absolute right-0 w-64 bg-white h-full shadow-md">
            {/* Sidenav content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Export Product Analysis</h2>
              <div className="mb-4">
                <label className="block mb-1">Select Store</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-full">
                  <option value="">Select...</option>
                  <option value="store1">Store 1</option>
                  <option value="store2">Store 2</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Select File Type</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-full">
                  <option value="excel">Excel</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              <button className="bg-blue-500 text-white px-3 py-2 rounded-md w-full">
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAnalysisDetailPage;
