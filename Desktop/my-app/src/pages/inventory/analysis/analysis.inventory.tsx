import { ReactDOM, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineExport, AiOutlineBarChart } from "react-icons/ai";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";
import Sidenav from "../../../components/sidePush";

const ProductAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", grossSales: "$10,000", netProfit: "$2,500", unitsSold: 500, stockLevel: 200 },
    { id: 2, name: "Product B", grossSales: "$8,000", netProfit: "$1,800", unitsSold: 400, stockLevel: 300 },
    // Add more products as needed
  ]);

  const handleOpenSidenav = () => {
    setIsSidenavOpen(true);
  };

  const handleCloseSidenav = () => {
    setIsSidenavOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSortByBestSold = () => {
    const sorted = [...products].sort((a, b) => b.unitsSold - a.unitsSold);
    setProducts(sorted);
  };

  const handleSortByLessSold = () => {
    const sorted = [...products].sort((a, b) => a.unitsSold - b.unitsSold);
    setProducts(sorted);
  };

  const handleSortByInDemand = () => {
    const sorted = [...products].sort((a, b) => b.stockLevel - a.stockLevel);
    setProducts(sorted);
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
                value={searchTerm}
                onChange={handleSearch}
                className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full max-w-xs"
              />
              <div className="flex ml-2">
                <button
                  onClick={handleSortByBestSold}
                  className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600"
                >
                  Best Sold
                </button>
                <button
                  onClick={handleSortByLessSold}
                  className="bg-green-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-green-600"
                >
                  Less Sold
                </button>
                <button
                  onClick={handleSortByInDemand}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600"
                >
                  In Demand
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-gray-600 dark:text-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-6 font-medium">S/N</th>
                  <th className="py-3 px-6 font-medium">Product Name</th>
                  <th className="py-3 px-6 font-medium">Gross Sales</th>
                  <th className="py-3 px-6 font-medium">Net Profit</th>
                  <th className="py-3 px-6 font-medium">Units Sold</th>
                  <th className="py-3 px-6 font-medium">Stock Level</th>
                  <th className="py-3 px-6 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">{product.name}</td>
                    <td className="py-3 px-6">{product.grossSales}</td>
                    <td className="py-3 px-6">{product.netProfit}</td>
                    <td className="py-3 px-6">{product.unitsSold}</td>
                    <td className="py-3 px-6">{product.stockLevel}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => navigate(`/products/${product.id}/analysis`)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                      >
                        View Full Analysis
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              <label className="text-gray-600 dark:text-gray-400 mb-1 block">
                Select Store
              </label>
              <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full">
                <option value="">Select...</option>
                <option value="store1">Store 1</option>
                <option value="store2">Store 2</option>
              </select>
            </div>

            <div>
              <label className="text-gray-600 dark:text-gray-400 mb-1 block">
                Select preferred file type
              </label>
              <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full">
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </>
        }
        button={
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">
            Export
          </button>
        }
      />
    </div>
  );
};

export default ProductAnalysisPage;
