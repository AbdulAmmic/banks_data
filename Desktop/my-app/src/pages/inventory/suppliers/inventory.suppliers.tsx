import React, { useState } from "react";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  company: string;
  numberOfProducts: number;
}

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: "John Doe", contact: "1234567890", email: "john@example.com", company: "Supply Co.", numberOfProducts: 100 },
    { id: 2, name: "Jane Smith", contact: "0987654321", email: "jane@example.com", company: "Distributor Ltd.", numberOfProducts: 150 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();

  const handleOpenModal = (supplier: Supplier | null = null) => {
    setCurrentSupplier(supplier);
    setIsEditing(!!supplier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSupplier = (supplier: Supplier) => {
    if (isEditing && currentSupplier) {
      // Edit existing supplier
      setSuppliers(suppliers.map((s) => (s.id === currentSupplier.id ? supplier : s)));
    } else {
      // Add new supplier
      setSuppliers([...suppliers, { ...supplier, id: suppliers.length + 1 }]);
    }
    handleCloseModal();
  };

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-2xl font-semibold">Suppliers</h1>
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center"
            >
              <AiOutlinePlus /> Add Supplier
            </button>
          </div>

          {/* Search */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 w-full mb-6">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search Suppliers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full max-w-xs"
              />
            </div>
          </div>

          {/* Suppliers Table */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Contact</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Company</th>
                  <th className="p-2 text-left">Number of Products</th>
                  <th className="p-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b dark:border-gray-600">
                    <td className="p-2">{supplier.name}</td>
                    <td className="p-2">{supplier.contact}</td>
                    <td className="p-2">{supplier.email}</td>
                    <td className="p-2">{supplier.company}</td>
                    <td className="p-2">{supplier.numberOfProducts}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => navigate(`/suppliers/details`)}
                        className="text-green-500 hover:text-green-600"
                      >
                        <AiOutlineEye />
                      </button>
                      <button
                        onClick={() => handleOpenModal(supplier)}
                        className="ml-2 text-blue-500 hover:text-blue-600"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteSupplier(supplier.id)}
                        className="ml-2 text-red-500 hover:text-red-600"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Inline Tailwind Modal for Adding/Editing Supplier */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Supplier" : "Add New Supplier"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const supplierData = {
                  id: currentSupplier?.id || suppliers.length + 1,
                  name: formData.get("name") as string,
                  contact: formData.get("contact") as string,
                  email: formData.get("email") as string,
                  company: formData.get("company") as string,
                  numberOfProducts: Number(formData.get("numberOfProducts")),
                };
                handleSaveSupplier(supplierData as Supplier);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Supplier Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentSupplier?.name || ""}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Contact</label>
                <input
                  type="text"
                  name="contact"
                  defaultValue={currentSupplier?.contact || ""}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={currentSupplier?.email || ""}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  defaultValue={currentSupplier?.company || ""}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Number of Products</label>
                <input
                  type="number"
                  name="numberOfProducts"
                  defaultValue={currentSupplier?.numberOfProducts || ""}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersPage;
