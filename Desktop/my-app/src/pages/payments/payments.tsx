import React, { useState } from "react";
import { AiOutlineExport, AiOutlineSwap } from "react-icons/ai";
import Sidebar from "../../components/sidenav";
import Header from "../../components/header";
import Sidenav from "../../components/sidePush";

const paymentsData = [
  { id: 1, date: "2024-09-10", amount: 500, method: "Credit Card", type: "Received", description: "" },
  { id: 2, date: "2024-09-11", amount: 300, method: "Bank Transfer", type: "Transferred", to: "John Doe", description: "Fund Transfer" },
  { id: 3, date: "2024-09-12", amount: 200, method: "Cash", type: "Received", description: "" },
  { id: 4, date: "2024-09-13", amount: 400, method: "Credit Card", type: "Transferred", to: "Jane Smith", description: "Payment for services" },
];

const PaymentsPage: React.FC = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [isReceivePaymentsOpen, setIsReceivePaymentsOpen] = useState(false);
  const [isTransferFundsOpen, setIsTransferFundsOpen] = useState(false);
  const [sortType, setSortType] = useState("");

  const handleOpenSidenav = () => setIsSidenavOpen(true);
  const handleCloseSidenav = () => setIsSidenavOpen(false);

  const handleOpenReceivePayments = () => setIsReceivePaymentsOpen(true);
  const handleCloseReceivePayments = () => setIsReceivePaymentsOpen(false);

  const handleOpenTransferFunds = () => setIsTransferFundsOpen(true);
  const handleCloseTransferFunds = () => setIsTransferFundsOpen(false);

  const handleSort = (sortBy: string) => {
    setSortType(sortBy);
  };

  // Filter payments based on sorting type
  const filteredPayments = sortType
    ? paymentsData.filter((payment) => payment.type === sortType)
    : paymentsData;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between mb-4">
            {/* Receive Payments Button */}
            <button
              onClick={handleOpenReceivePayments}
              className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 flex items-center"
            >
              <AiOutlineSwap /> Receive Payments
            </button>

            {/* Transfer Funds Button */}
            <button
              onClick={handleOpenTransferFunds}
              className="bg-amber-500 text-white px-3 py-2 rounded-md hover:bg-amber-600 flex items-center"
            >
              Transfer Funds
            </button>

            {/* Export Payments Button */}
            <button
              title="Export Payments"
              onClick={handleOpenSidenav}
              className="border border-yellow-500 text-yellow-500 px-3 py-2 rounded-md hover:bg-yellow-50 flex items-center"
            >
              <AiOutlineExport />
            </button>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {/* Cards for Summary */}
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Available Balance</h3>
              <button className="border border-blue-500 text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50">Refresh</button>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Revenue Summary</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Today's Income</h3>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 w-full">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search Payments"
                className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full max-w-xs"
              />
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 ml-2"
              >
                <option value="">Sort By</option>
                <option value="Received">Received</option>
                <option value="Transferred">Transferred</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-600 dark:text-gray-200">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-6 font-medium">S/N</th>
                    <th className="py-3 px-6 font-medium">Date</th>
                    <th className="py-3 px-6 font-medium">Amount</th>
                    <th className="py-3 px-6 font-medium">Method</th>
                    <th className="py-3 px-6 font-medium">Type</th>
                    <th className="py-3 px-6 font-medium">To</th>
                    <th className="py-3 px-6 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment, index) => (
                      <tr
                        key={payment.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6">{payment.date}</td>
                        <td className="py-3 px-6">${payment.amount}</td>
                        <td className="py-3 px-6">{payment.method}</td>
                        <td className="py-3 px-6">{payment.type}</td>
                        <td className="py-3 px-6">{payment.to || "N/A"}</td>
                        <td className="py-3 px-6">{payment.description || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-3 px-6 text-center text-gray-500 dark:text-gray-400"
                      >
                        No payments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Sidenav for Export Payments */}
      <Sidenav
        isOpen={isSidenavOpen}
        onClose={handleCloseSidenav}
        header="Payments Export"
        description="Export your payments from multiple stores in PDF or Excel"
        inputs={
          <>
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">Select Store</label>
            <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full">
              <option value="">Select...</option>
              <option value="store1">Store 1</option>
              <option value="store2">Store 2</option>
            </select>
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">Select preferred file type</label>
            <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full">
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </>
        }
        button={<button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">Export</button>}
      />

      {/* Sidenav for Receive Payments */}
      <Sidenav
        isOpen={isReceivePaymentsOpen}
        onClose={handleCloseReceivePayments}
        header="Receive Payments"
        description="Record new payments received from customers"
        inputs={
          <>
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">Customer Name</label>
            <input
              type="text"
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
              placeholder="Enter customer name"
            />
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">Payment Method</label>
            <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full">
              <option value="">Select...</option>
              <option value="credit">Credit Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">Amount</label>
            <input
              type="number"
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
              placeholder="Enter amount"
            />
          </>
        }
        button={<button className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600">Receive</button>}
      />

      {/* Sidenav for Transfer Funds */}
      <Sidenav
        isOpen={isTransferFundsOpen}
        onClose={handleCloseTransferFunds}
        header="Transfer Funds"
        description="Transfer funds from one store to another"
        inputs={
          <>
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">To</label>
            <input
              type="text"
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
              placeholder="Enter recipient name"
            />
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">Description</label>
            <input
              type="text"
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
              placeholder="Enter description"
            />
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">Amount</label>
            <input
              type="number"
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
              placeholder="Enter amount"
            />
          </>
        }
        button={<button className="bg-amber-500 text-white px-3 py-2 rounded-md hover:bg-amber-600">Transfer</button>}
      />
    </div>
  );
};

export default PaymentsPage;
