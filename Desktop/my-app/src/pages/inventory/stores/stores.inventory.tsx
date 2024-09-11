import React, { useState } from "react";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";

interface Store {
  id: number;
  name: string;
  location: string;
  revenue: number;
  employees: number;
  numberOfProducts: number;
}

const StoresPage = () => {
  const [stores, setStores] = useState<Store[]>([
    { id: 1, name: "Downtown Store", location: "123 Main St", revenue: 50000, employees: 10, numberOfProducts: 100 },
    { id: 2, name: "Uptown Store", location: "456 High St", revenue: 80000, employees: 15, numberOfProducts: 150 },
    { id: 3, name: "Suburban Store", location: "789 Oak Ave", revenue: 60000, employees: 8, numberOfProducts: 120 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (store: Store | null = null) => {
    setCurrentStore(store);
    setIsEditing(!!store);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveStore = (store: Store) => {
    if (isEditing && currentStore) {
      // Edit existing store
      setStores(stores.map((s) => (s.id === currentStore.id ? store : s)));
    } else {
      // Add new store
      setStores([...stores, { ...store, id: stores.length + 1 }]);
    }
    handleCloseModal();
  };

  const handleDeleteStore = (id: number) => {
    setStores(stores.filter((store) => store.id !== id));
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-2xl font-semibold">Stores</h1>
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center"
            >
              <AiOutlinePlus /> Add Store
            </button>
          </div>

          {/* Search */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 w-full mb-6">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search Stores"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full max-w-xs"
              />
            </div>
          </div>

          {/* Stores Table */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Location</th>
                  <th className="p-2 text-left">Revenue</th>
                  <th className="p-2 text-left">Employees</th>
                  <th className="p-2 text-left">Number of Products</th>
                  <th className="p-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.map((store) => (
                  <tr key={store.id} className="border-b dark:border-gray-600">
                    <td className="p-2">{store.name}</td>
                    <td className="p-2">{store.location}</td>
                    <td className="p-2">N {store.revenue.toFixed(2)}</td>
                    <td className="p-2">{store.employees}</td>
                    <td className="p-2">{store.numberOfProducts}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => handleOpenModal(store)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteStore(store.id)}
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

      {/* Inline Tailwind Modal for Adding/Editing Store */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Store" : "Add New Store"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const storeData = {
                  id: currentStore?.id || stores.length + 1,
                  name: formData.get("name") as string,
                  location: formData.get("location") as string,
                  revenue: Number(formData.get("revenue")),
                  employees: Number(formData.get("employees")),
                  numberOfProducts: Number(formData.get("numberOfProducts")),
                };
                handleSaveStore(storeData as Store);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Store Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentStore?.name || ""}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={currentStore?.location || ""}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Revenue</label>
                <input
                  type="number"
                  name="revenue"
                  defaultValue={currentStore?.revenue || 0}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Employees</label>
                <input
                  type="number"
                  name="employees"
                  defaultValue={currentStore?.employees || 0}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Number of Products</label>
                <input
                  type="number"
                  name="numberOfProducts"
                  defaultValue={currentStore?.numberOfProducts || 0}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
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

export default StoresPage;
