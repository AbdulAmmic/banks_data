import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/sidenav";
import Header from "../../components/header";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

type Customer = {
  id: number;
  name: string;
  walletBalance: string;
  address: string;
  phoneNumber: string;
};

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "John Doe",
      walletBalance: "$500.00",
      address: "123 Main St",
      phoneNumber: "+1234567890",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  // Ref for modal content
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Effect to handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Open modal for adding/editing
  const openModal = (customer: Customer | null = null) => {
    if (customer) {
      setIsEditing(true);
      setCurrentCustomer(customer);
    } else {
      setIsEditing(false);
      setCurrentCustomer(null);
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCustomer(null);
  };

  // Add or edit customer
  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const customerData: Customer = {
      id: currentCustomer ? currentCustomer.id : customers.length + 1,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      walletBalance: (form.elements.namedItem("walletBalance") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      phoneNumber: (form.elements.namedItem("phoneNumber") as HTMLInputElement).value,
    };

    if (currentCustomer) {
      setCustomers((prevCustomers) =>
        prevCustomers.map((cust) =>
          cust.id === currentCustomer.id ? customerData : cust
        )
      );
    } else {
      setCustomers([...customers, customerData]);
    }
    closeModal();
  };

  // Delete customer
  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex">
            Home / Customers
          </h1>

          {/* Customers Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Customers
            </h2>
            <button
              onClick={() => openModal()}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              <AiOutlinePlus size={20} />
              Add Customer
            </button>
          </div>

          {/* Customers Table */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Wallet Balance</th>
                  <th className="py-3 px-6 text-left">Address</th>
                  <th className="py-3 px-6 text-left">Phone Number</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300 text-sm">
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-6 text-left">{customer.name}</td>
                    <td className="py-3 px-6 text-left">{customer.walletBalance}</td>
                    <td className="py-3 px-6 text-left">{customer.address}</td>
                    <td className="py-3 px-6 text-left">{customer.phoneNumber}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openModal(customer)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <BiEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Add/Edit Customer */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div
                ref={modalRef}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-lg font-semibold mb-4">
                  {isEditing ? "Edit Customer" : "Add Customer"}
                </h2>
                <form onSubmit={handleSaveCustomer}>
                  {/* Name Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={currentCustomer?.name || ""}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>
                  {/* Wallet Balance Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Wallet Balance</label>
                    <input
                      type="text"
                      name="walletBalance"
                      defaultValue={currentCustomer?.walletBalance || ""}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>
                  {/* Address Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Address</label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={currentCustomer?.address || ""}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>
                  {/* Phone Number Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      defaultValue={currentCustomer?.phoneNumber || ""}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      {isEditing ? "Save Changes" : "Add Customer"}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Customers;
