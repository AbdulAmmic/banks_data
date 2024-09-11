import React, { useState } from "react";
import { AiOutlineExport, AiOutlineSwap } from "react-icons/ai";
import Sidebar from "../../components/sidenav";
import Header from "../../components/header";
import Sidenav from "../../components/sidePush";

type Payment = {
  id: number;
  date: string;
  amount: number;
  method: string;
  type: "Received" | "Transferred";
  to?: string;
  description?: string;
};

const initialPayments: Payment[] = [
  { id: 1, date: "2024-09-10", amount: 500, method: "Credit Card", type: "Received" },
  { id: 2, date: "2024-09-11", amount: 300, method: "Bank Transfer", type: "Transferred", to: "John Doe", description: "Fund Transfer" },
  { id: 3, date: "2024-09-12", amount: 200, method: "Cash", type: "Received" },
  { id: 4, date: "2024-09-13", amount: 400, method: "Credit Card", type: "Transferred", to: "Jane Smith", description: "Payment for services" },
];

const PaymentsPage: React.FC = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [isReceivePaymentsOpen, setIsReceivePaymentsOpen] = useState(false);
  const [isTransferFundsOpen, setIsTransferFundsOpen] = useState(false);
  const [paymentsData, setPaymentsData] = useState<Payment[]>(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPaymentId, setNewPaymentId] = useState(initialPayments.length + 1); // Keep track of new IDs
  const [sortConfig, setSortConfig] = useState<{ key: keyof Payment; direction: "asc" | "desc" }>({
    key: "date",
    direction: "asc",
  });

  // Sidenav handlers
  const handleOpenSidenav = () => setIsSidenavOpen(true);
  const handleCloseSidenav = () => setIsSidenavOpen(false);
  const handleOpenReceivePayments = () => setIsReceivePaymentsOpen(true);
  const handleCloseReceivePayments = () => setIsReceivePaymentsOpen(false);
  const handleOpenTransferFunds = () => setIsTransferFundsOpen(true);
  const handleCloseTransferFunds = () => setIsTransferFundsOpen(false);

  // Function to add a received payment
  const addReceivedPayment = (customerName: string, paymentMethod: string, amount: number) => {
    const newPayment: Payment = {
      id: newPaymentId,
      date: new Date().toISOString().slice(0, 10),
      amount,
      method: paymentMethod,
      type: "Received",
    };
    setPaymentsData([...paymentsData, newPayment]);
    setNewPaymentId(newPaymentId + 1);
    handleCloseReceivePayments();
  };

  // Function to add a transfer
  const addTransferFunds = (recipient: string, description: string, amount: number) => {
    const newPayment: Payment = {
      id: newPaymentId,
      date: new Date().toISOString().slice(0, 10),
      amount,
      method: "Transfer",
      type: "Transferred",
      to: recipient,
      description,
    };
    setPaymentsData([...paymentsData, newPayment]);
    setNewPaymentId(newPaymentId + 1);
    handleCloseTransferFunds();
  };

  // Sorting function
  const sortedPayments = [...paymentsData].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof Payment];
    const bValue = b[sortConfig.key as keyof Payment];
  
    if (aValue === undefined || bValue === undefined) {
      return 0; // If either value is undefined, do not sort
    }
  
    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  

  // Search functionality
  const filteredPayments = sortedPayments.filter((payment) =>
    payment.date.includes(searchTerm) ||
    payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (payment.to && payment.to.toLowerCase().includes(searchTerm.toLowerCase())) ||
    payment.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key: keyof Payment) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between mb-4">
            <button
              onClick={handleOpenReceivePayments}
              className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 flex items-center"
            >
              <AiOutlineSwap /> Receive Payments
            </button>
            <button
              onClick={handleOpenTransferFunds}
              className="bg-amber-500 text-white px-3 py-2 rounded-md hover:bg-amber-600 flex items-center"
            >
              Transfer Funds
            </button>
            <button
              title="Export Payments"
              onClick={handleOpenSidenav}
              className="border border-yellow-500 text-yellow-500 px-3 py-2 rounded-md hover:bg-yellow-50 flex items-center"
            >
              <AiOutlineExport />
            </button>
          </div>

          {/* Payments Table */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 w-full">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search Payments"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full max-w-xs"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-600 dark:text-gray-200">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-6 font-medium cursor-pointer" onClick={() => handleSort("id")}>
                      S/N {sortConfig.key === "id" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="py-3 px-6 font-medium cursor-pointer" onClick={() => handleSort("date")}>
                      Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="py-3 px-6 font-medium cursor-pointer" onClick={() => handleSort("amount")}>
                      Amount {sortConfig.key === "amount" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="py-3 px-6 font-medium cursor-pointer" onClick={() => handleSort("method")}>
                      Method {sortConfig.key === "method" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="py-3 px-6 font-medium cursor-pointer" onClick={() => handleSort("type")}>
                      Type {sortConfig.key === "type" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="py-3 px-6 font-medium cursor-pointer" onClick={() => handleSort("to")}>
                      To {sortConfig.key === "to" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                    </th>
                    <th className="py-3 px-6 font-medium cursor-pointer" onClick={() => handleSort("description")}>
                      Description {sortConfig.key === "description" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                    </th>
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
                        <td className="py-3 px-6">N {payment.amount}</td>
                        <td className="py-3 px-6">{payment.method}</td>
                        <td className="py-3 px-6">{payment.type}</td>
                        <td className="py-3 px-6">{payment.to || "N/A"}</td>
                        <td className="py-3 px-6">{payment.description || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-3 px-6 text-center">
                        No payments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidenav for Receive Payments */}
          <Sidenav
            isOpen={isReceivePaymentsOpen}
            onClose={handleCloseReceivePayments}
            header="Receive Payments"
            description="Record received payments"
            inputs={
              <>
                <label className="text-gray-600 dark:text-gray-400 mb-1 block">Customer Name</label>
                <input
                  type="text"
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                  placeholder="Enter customer name"
                  id="customerName"
                />
                <label className="text-gray-600 dark:text-gray-400 mb-1 block">Payment Method</label>
                <input
                  type="text"
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                  placeholder="Enter payment method"
                  id="paymentMethod"
                />
                <label className="text-gray-600 dark:text-gray-400 mb-1 block">Amount</label>
                <input
                  type="number"
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                  placeholder="Enter amount"
                  id="paymentAmount"
                />
              </>
            }
            button={<button onClick={() => addReceivedPayment(
              (document.getElementById("customerName") as HTMLInputElement).value,
              (document.getElementById("paymentMethod") as HTMLInputElement).value,
              parseFloat((document.getElementById("paymentAmount") as HTMLInputElement).value)
            )} className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600">Receive</button>}
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
                  id="transferRecipient"
                />
                <label className="text-gray-600 dark:text-gray-400 mb-1 block">Description</label>
                <input
                  type="text"
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                  placeholder="Enter description"
                  id="transferDescription"
                />
                <label className="text-gray-600 dark:text-gray-400 mb-1 block">Amount</label>
                <input
                  type="number"
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                  placeholder="Enter amount"
                  id="transferAmount"
                />
              </>
            }
            button={<button onClick={() => addTransferFunds(
              (document.getElementById("transferRecipient") as HTMLInputElement).value,
              (document.getElementById("transferDescription") as HTMLInputElement).value,
              parseFloat((document.getElementById("transferAmount") as HTMLInputElement).value)
            )} className="bg-amber-500 text-white px-3 py-2 rounded-md hover:bg-amber-600">Transfer</button>}
          />
        </main>
      </div>
    </div>
  );
};

export default PaymentsPage;
