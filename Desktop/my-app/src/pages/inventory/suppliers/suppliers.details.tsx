import React from "react";
import { AiOutlinePlus, AiOutlineHistory, AiOutlineDollarCircle } from "react-icons/ai";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";

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
      },
      // Add more history items as needed
    ],
  };

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
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
              <h1 className="text-3xl font-bold mb-4">{supplier.companyName}</h1>
              <p className="text-lg mb-2"><strong>Address:</strong> {supplier.address}</p>
              <p className="text-lg mb-4"><strong>Supplier:</strong> {supplier.name}</p>
              <div className="flex space-x-4 mb-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                  onClick={() => alert("Create New Supply")}
                >
                  <AiOutlinePlus/> New Supply
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex items-center"
                  onClick={() => alert("Show Supply History")}
                >
                  <AiOutlineHistory  /> Supply History
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
                  onClick={() => alert("View Total Settled and Unsettled Bills")}
                >
                  <AiOutlineDollarCircle /> View Total Bills
                </button>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Supplier Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium mb-2">Total Products Supplied</h3>
                    <p className="text-2xl font-bold">{supplier.totalProductsSupplied.toLocaleString()}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium mb-2">Total Bill Settled</h3>
                    <p className="text-2xl font-bold">${supplier.totalBillSettled.toLocaleString()}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium mb-2">Total Bill Unsettled</h3>
                    <p className="text-2xl font-bold">${supplier.totalBillUnsettled.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Supply History</h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplier.supplyHistory.map((history) => (
                      <tr key={history.id} className="border-b dark:border-gray-600">
                        <td className="p-2">{history.date}</td>
                        <td className="p-2">{history.description}</td>
                        <td className="p-2">{history.location}</td>
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
