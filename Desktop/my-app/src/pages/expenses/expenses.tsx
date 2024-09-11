import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/sidenav";
import Header from "../../components/header";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

type Expense = {
  id: number;
  store: string;
  description: string;
  paymentMethod: string;
  expenseName: string;
  amount: string;
  date: string;
  category: string;
};

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      store: "Main Store",
      description: "Office Supplies",
      paymentMethod: "Credit Card",
      expenseName: "Supplies",
      amount: "$120.00",
      date: "2024-09-10",
      category: "Expenses",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [newCategory, setNewCategory] = useState("");

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
    const form = e.target as HTMLFormElement;

    const expenseData: Expense = {
      id: currentExpense ? currentExpense.id : expenses.length + 1,
      store: form.store.value, // Store is no longer used
      description: form.description.value,
      paymentMethod: form.paymentMethod.value,
      expenseName: form.expenseName.value,
      amount: form.amount.value,
      date: form.date.value,
      category: form.category.value || newCategory,
    };

    if (currentExpense) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp.id === currentExpense.id ? expenseData : exp))
      );
    } else {
      setExpenses([...expenses, expenseData]);
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
              <AiOutlinePlus size={20} />
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
                  <th className="py-3 px-6 text-left">Store</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Payment Method</th>
                  <th className="py-3 px-6 text-left">Expense Name</th>
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
                    <td className="py-3 px-6 text-left">{expense.store}</td>
                    <td className="py-3 px-6 text-left">{expense.description}</td>
                    <td className="py-3 px-6 text-left">{expense.paymentMethod}</td>
                    <td className="py-3 px-6 text-left">{expense.expenseName}</td>
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
              <div
                ref={modalRef}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-lg font-semibold mb-4">
                  {isEditing ? "Edit Expense" : "Add Expense"}
                </h2>
                <form onSubmit={handleSaveExpense}>
                  {/* Expense Name Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Expense Name
                    </label>
                    <input
                      type="text"
                      name="expenseName"
                      defaultValue={currentExpense?.expenseName || ""}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>
                  {/* Description Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      defaultValue={currentExpense?.description || ""}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>
                  {/* Payment Method Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Payment Method
                    </label>
                    <input
                      type="text"
                      name="paymentMethod"
                      defaultValue={currentExpense?.paymentMethod || ""}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>
                  {/* Amount Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Amount
                    </label>
                    <input
                      type="text"
                      name="amount"
                      defaultValue={currentExpense?.amount || ""}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>
                  {/* Date Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={currentExpense?.date || ""}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>
                  {/* Category Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={currentExpense?.category || ""}
                      className="border rounded p-2 w-full"
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      {isEditing ? "Save Changes" : "Add Expense"}
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

export default Expenses;
