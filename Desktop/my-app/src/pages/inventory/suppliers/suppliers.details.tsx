import React from "react";
import { AiOutlinePlus, AiOutlineSearch, AiOutlineFileExcel } from "react-icons/ai";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";
import { useNavigate } from "react-router-dom";

const SupplierDetailPage = () => {
    
  // Static supplier data for demonstration
  const supplier = {
    companyName: "TECHNO MOLINED MEDICINES",
    address: "Kano, Nigeria",
    name: "Abu Danrimi",
    totalProductsSupplied: 12000,
    totalBillSettled: 233000,
    totalBillUnsettled: 0,
    supplyHistory: [
      {
        id: 1,
        date: "22/09/2034",
        description: "Description of supply",
        location: "Location of supply",
        productsCollected: 500,
        debtSettled: 10000,
        billUnsettled: 0,
      },
      // Add more history items as needed
    ],
  };
 const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
              <h1 className="text-3xl font-bold mb-4">{supplier.companyName}</h1>
              <p className="text-lg mb-2"><strong>Address:</strong> {supplier.address}</p>
              <p className="text-lg mb-4"><strong>Supplier:</strong> {supplier.name}</p>
              <div className="flex space-x-4 mb-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                  onClick={() => navigate('/suppliers/new')}

                >
                  <AiOutlinePlus /> New Supply
                </button>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Supplier Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Total Products Supplied</h3>
                    <p className="text-2xl font-bold">{supplier.totalProductsSupplied.toLocaleString()}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Total Bill Settled</h3>
                    <p className="text-2xl font-bold">N {supplier.totalBillSettled.toLocaleString()}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Total Bill Unsettled</h3>
                    <p className="text-2xl font-bold">N {supplier.totalBillUnsettled.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Product Returns</h2>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Total Returns</h3>
                  <p className="text-2xl ">23 Products</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Supply History</h2>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search history..."
                    className="border border-gray-300 dark:border-gray-600 rounded-md p-2 flex-1"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 flex items-center"
                    onClick={() => alert("Generate history report in Excel")}
                  >
                    <AiOutlineFileExcel/> Generate Report
                  </button>
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">Location</th>
                      <th className="p-2 text-left">Products Collected</th>
                      <th className="p-2 text-left">Debt Settled</th>
                      <th className="p-2 text-left">Bill Unsettled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplier.supplyHistory.map((history) => (
                      <tr key={history.id} className="border-b dark:border-gray-600">
                        <td className="p-2">{history.date}</td>
                        <td className="p-2">{history.description}</td>
                        <td className="p-2">{history.location}</td>
                        <td className="p-2">{history.productsCollected.toLocaleString()}</td>
                        <td className="p-2">N {history.debtSettled.toLocaleString()}</td>
                        <td className="p-2">N {history.billUnsettled.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupplierDetailPage;
