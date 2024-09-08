import { useState } from "react";
import { AiOutlineExport } from "react-icons/ai";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";
import Sidenav from "../../../components/sidePush";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const chartConfig = {
  type: "bar",
  height: 240,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

const ProductAnalysisDetailPage: React.FC = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const handleOpenSidenav = () => {
    setIsSidenavOpen(true);
  };

  const handleCloseSidenav = () => {
    setIsSidenavOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
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
              className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 flex items-center"
            >
              <AiOutlineExport /> Export Analysis
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 w-full mb-6">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search Products"
                className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full max-w-xs"
              />
              <select className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 ml-2">
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
            <Card>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
              >
                <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                  <Square3Stack3DIcon className="h-6 w-6" />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Sales Overview
                  </Typography>
                  <Typography variant="small" color="gray" className="max-w-sm font-normal">
                    Visualize your sales data in an interactive bar chart.
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="px-2 pb-0">
                <Chart {...chartConfig} />
              </CardBody>
            </Card>

            {/* Additional Graphs (for demonstration purposes) */}
            <Card>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
              >
                <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                  <Square3Stack3DIcon className="h-6 w-6" />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Product Performance
                  </Typography>
                  <Typography variant="small" color="gray" className="max-w-sm font-normal">
                    Track the performance of different products over time.
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="px-2 pb-0">
                <Chart {...chartConfig} />
              </CardBody>
            </Card>
          </div>
        </main>
      </div>

      {/* Sidenav for Export Analysis */}
      <Sidenav
        isOpen={isSidenavOpen}
        onClose={handleCloseSidenav}
        header="Export Product Analysis"
        description="Export the product analysis data in PDF or Excel format."
        inputs={
          <>
            <div>
              <label className="text-gray-600 dark:text-gray-400 mb-1 block">Select Store</label>
              <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full">
                <option value="">Select...</option>
                <option value="store1">Store 1</option>
                <option value="store2">Store 2</option>
              </select>
            </div>
            <div>
              <label className="text-gray-600 dark:text-gray-400 mb-1 block">Select preferred file type</label>
              <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full">
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </>
        }
        button={<button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">Export</button>}
      />
    </div>
  );
};

export default ProductAnalysisDetailPage;
