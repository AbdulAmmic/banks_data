import React, { useState } from "react";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";
import Modal from "../../../components/modal";

interface Category {
  id: number;
  name: string;
  description: string;
  profit: number;
  unitsSold: number;
  numberOfProducts: number;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Electronics", description: "Gadgets and devices", profit: 10000, unitsSold: 150, numberOfProducts: 25 },
    { id: 2, name: "Fashion", description: "Clothes and accessories", profit: 8000, unitsSold: 200, numberOfProducts: 30 },
    { id: 3, name: "Home Appliances", description: "Appliances for home use", profit: 12000, unitsSold: 100, numberOfProducts: 20 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<'bestSold' | 'lessSold'>('bestSold');

  const handleOpenModal = (category: Category | null = null) => {
    setCurrentCategory(category);
    setIsEditing(!!category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCategory = (category: Category) => {
    if (isEditing && currentCategory) {
      // Edit existing category
      setCategories(categories.map((cat) => (cat.id === currentCategory.id ? category : cat)));
    } else {
      // Add new category
      setCategories([...categories, { ...category, id: categories.length + 1 }]);
    }
    handleCloseModal();
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Filter categories based on search input
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort categories based on selected sort order
  const sortedCategories = filteredCategories.sort((a, b) => {
    if (sortOrder === 'bestSold') {
      return b.unitsSold - a.unitsSold; // Sorting by units sold in descending order
    } else {
      return a.unitsSold - b.unitsSold; // Sorting by units sold in ascending order
    }
  });

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
            <h1 className="text-2xl font-semibold">Categories</h1>
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center"
            >
              <AiOutlinePlus /> Add Category
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 w-full mb-6">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search Categories"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full max-w-xs"
              />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'bestSold' | 'lessSold')}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 ml-4"
              >
                <option value="bestSold">Best Sold</option>
                <option value="lessSold">Less Sold</option>
              </select>
            </div>
          </div>

          {/* Categories Table */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Profit</th>
                  <th className="p-2 text-left">Units Sold</th>
                  <th className="p-2 text-left">Number of Products</th>
                  <th className="p-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCategories.map((category) => (
                  <tr key={category.id} className="border-b dark:border-gray-600">
                    <td className="p-2">{category.name}</td>
                    <td className="p-2">{category.description}</td>
                    <td className="p-2">${category.profit.toFixed(2)}</td>
                    <td className="p-2">{category.unitsSold}</td>
                    <td className="p-2">{category.numberOfProducts}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => handleOpenModal(category)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
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

      {/* Modal for Adding/Editing Category */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        header={isEditing ? "Edit Category" : "Add New Category"}
        onSave={()=>handleSaveCategory}
        category={currentCategory}
      />
    </div>
  );
};

export default CategoriesPage;
