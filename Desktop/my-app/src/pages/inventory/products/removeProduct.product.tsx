import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineDelete,
} from "react-icons/ai";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";
import Sidenav from "../../../components/sidePush";

const RemoveProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleOpenSidenav = () => {
    if (selectedProducts.length > 0) {
      setIsSidenavOpen(true);
    }
  };

  const handleCloseSidenav = () => {
    setIsSidenavOpen(false);
  };

  const handleProductSelection = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Example products for demo purposes
  const products = [
    { id: "1", name: "Product 1", category: "Category A", quantity: 100 },
    { id: "2", name: "Product 2", category: "Category B", quantity: 50 },
    { id: "3", name: "Product 3", category: "Category C", quantity: 75 },
    // Add more products as needed
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.quantity.toString().includes(searchQuery)
  );

  const handleConfirmRemoval = () => {
    // Implement the removal logic here
    console.log("Removing products:", selectedProducts);
    // After removal, you might want to clear the selection and close the sidenav
    setSelectedProducts([]);
    setIsSidenavOpen(false);
  };

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
            {/* Back Button */}
            <button
              onClick={() => navigate("/inventory/products")}
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center"
            >
              <AiOutlineArrowLeft /> Back to Products
            </button>

            {/* Remove Button */}
            <button
              onClick={handleOpenSidenav}
              className={`${
                selectedProducts.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } text-white px-3 py-2 rounded-md flex items-center`}
              disabled={selectedProducts.length === 0}
            >
              <AiOutlineDelete /> Remove Products
            </button>
          </div>

          {/* Products Search and Select */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 w-full">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full max-w-xs"
              />
            </div>

            {/* Products List */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-600 dark:text-gray-200">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-6 font-medium">Select</th>
                    <th className="py-3 px-6 font-medium">S/N</th>
                    <th className="py-3 px-6 font-medium">Name</th>
                    <th className="py-3 px-6 font-medium">Category</th>
                    <th className="py-3 px-6 font-medium">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <td className="py-3 px-6">
                          <input
                            type="checkbox"
                            onChange={() => handleProductSelection(product.id)}
                            checked={selectedProducts.includes(product.id)}
                            className="form-checkbox h-5 w-5 text-red-600"
                          />
                        </td>
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6">{product.name}</td>
                        <td className="py-3 px-6">{product.category}</td>
                        <td className="py-3 px-6">{product.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-3 px-6 text-center text-gray-500 dark:text-gray-400"
                      >
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Sidenav for Remove Products */}
      <Sidenav
        isOpen={isSidenavOpen}
        onClose={handleCloseSidenav}
        header="Remove Products"
        description="Are you sure you want to remove the selected products? This action cannot be undone."
        inputs={
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You are about to remove the following products:
            </p>
            <ul className="list-disc list-inside mb-4">
              {products
                .filter((product) => selectedProducts.includes(product.id))
                .map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
            </ul>
          </div>
        }
        button={
          <button
            onClick={handleConfirmRemoval}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Confirm Removal
          </button>
        }
      />
    </div>
  );
};

export default RemoveProductsPage;
