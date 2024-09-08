import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineAppstoreAdd,
  AiOutlineCloudUpload,
} from "react-icons/ai";

const AddProductModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
     

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-lg shadow-lg relative p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Add New Product
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 dark:text-gray-400 hover:text-red-500"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {/* Cards Section */}
            <div className="grid gap-4">
              {/* Single Product Card */}
              <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center">
                <AiOutlinePlus
                  size={36}
                
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Create a Single Product
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create and manage a single product in your inventory.
                  </p>
                </div>
              </div>

              {/* Composite Product Card */}
              <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center">
                <AiOutlineAppstoreAdd
                  size={36}
                
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Create a Composite Product
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Combine multiple products into a composite product.
                  </p>
                </div>
              </div>

              {/* Bulk Upload Product Card */}
              <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center">
                <AiOutlineCloudUpload
                  size={36}
                 
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Bulk Upload Products
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload multiple products at once using a CSV file.
                  </p>
                </div>
              </div>
            </div>

            {/* Cancel Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModal;
