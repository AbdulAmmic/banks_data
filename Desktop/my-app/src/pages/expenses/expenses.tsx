import React, { useState } from "react";
import Sidebar from "../../components/sidenav";
import Header from "../../components/header";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

type Expense = {
  id: number;
  description: string;
  amount: string;
  date: string;
  category: string;
};

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: "Office Supplies", amount: "$120.00", date: "2024-09-10", category: "General" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

  // Open modal for adding/editing
  const openModal = (expense: Expense | null = null) => {
    if (expense) {
      setIsEditing(true);
      setCurrentExpense(expense);
    } else {
      setIsEditing(false);
      setCurrentExpense(null);
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExpense(null);
  };

  // Add or edit expense
  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentExpense) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) =>
          exp.id === currentExpense.id ? currentExpense : exp
        )
      );
    } else {
      const newExpense: Expense = {
        id: expenses.length + 1,
        description: (e.target as any).description.value,
        amount: (e.target as any).amount.value,
        date: (e.target as any).date.value,
        category: (e.target as any).category.value,
      };
      setExpenses([...expenses, newExpense]);
    }
    closeModal();
  };

  // Delete expense
  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Filtered expenses based on search query
  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Home / Expenses
          </h1>

          {/* Expenses Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Expenses
            </h2>
            <button
              onClick={() => openModal()}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              <AiOutlinePlus size={20}/>
              Add Expense
            </button>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded p-2 w-full mr-4"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded p-2"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>

          {/* Expenses Table */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300 text-sm">
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {expense.description}
                    </td>
                    <td className="py-3 px-6 text-left">{expense.amount}</td>
                    <td className="py-3 px-6 text-left">{expense.date}</td>
                    <td className="py-3 px-6 text-left">{expense.category}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openModal(expense)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <BiEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
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

          {/* Modal for Add/Edit Expense */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">
                  {isEditing ? "Edit Expense" : "Add Expense"}
                </h2>
                <form onSubmit={handleSaveExpense}>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      defaultValue={currentExpense?.description || ""}
                      required
                      className="border rounded w-full p-2 mt-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Amount
                    </label>
                    <input
                      type="text"
                      name="amount"
                      defaultValue={currentExpense?.amount || ""}
                      required
                      className="border rounded w-full p-2 mt-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={currentExpense?.date || ""}
                      required
                      className="border rounded w-full p-2 mt-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={currentExpense?.category || ""}
                      required
                      className="border rounded w-full p-2 mt-2"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mr-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      {isEditing ? "Update" : "Add"}
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

export default Expenses;
