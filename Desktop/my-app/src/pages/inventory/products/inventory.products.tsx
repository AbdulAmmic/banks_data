import {ReactDOM, useState} from "react";
import { useNavigate} from "react-router-dom";
import {
  AiOutlinePlus,
  AiOutlineExport,
  AiOutlineRollback,
  AiOutlineClose,
  AiOutlineSwap,
  AiOutlineReload,

  AiOutlineCloudUpload,
  AiOutlineStar
} from "react-icons/ai";
import {
  MdOutlineAssignmentReturned,
  MdOutlineAutorenew,
} from "react-icons/md";
import Sidebar from "../../../components/sidenav";
import Header from "../../../components/header";
import Sidenav from "../../../components/sidePush";
import AddProductModal from "../../../components/modal";

const ProductsPage: React.FC = () => {
    const navigate = useNavigate();
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  
    const handleOpenSidenav = () => {
      setIsSidenavOpen(true);
    };
  
    const handleCloseSidenav = () => {
      setIsSidenavOpen(false);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    return (
       
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar />
  
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          {/* <AddProductModal />    */}
          {/* Main content */}
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="flex justify-between mb-4">
              {/* Add Product Button */}
              <button
                 onClick={handleOpenModal}
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center"
              >
                <AiOutlinePlus /> Add New Product
              </button>
  
              {/* Right Side Buttons */}
              <div className="flex space-x-2">
                {/* Restock Button */}
                <button 
                 onClick={()=>{
                    navigate('/inventory/products/restock')
                  }}
                className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 flex items-center">
                  <AiOutlineReload /> Restock
                </button>
  
                {/* Returns Button */}
                <button 
                 onClick={()=>{
                    navigate('/inventory/products/returns')
                  }}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 flex items-center">
                  <MdOutlineAssignmentReturned /> Returns
                </button>
  
                {/* Reconciliations Button */}
                <button 
                 onClick={()=>{
                    navigate('/inventory/products/reconciliations')
                  }}
                className="bg-amber-500 text-white px-2 py-1 rounded-md hover:bg-amber-600 flex items-center">
                  <MdOutlineAutorenew /> Reconciliations
                </button>
  
                {/* Remove Stock Button */}
                <button
                  onClick={()=>{
                    navigate('/inventory/products/remove')
                  }}
                  title="Remove Product"
                  className="border border-red-500 text-red-500 px-2 py-1 rounded-md hover:bg-red-50 flex items-center"
                >
                  <AiOutlineClose />
                </button>
  
                {/* Transfer Stock Button */}
                <button
                  title="Transfer Product"
                  onClick={()=>{
                    navigate('/inventory/products/transfer')
                  }}
                  className="border border-green-500 text-green-500 px-3 py-1 rounded-md hover:bg-green-50 flex items-center"
                >
                  <AiOutlineSwap />
                </button>
  
                {/* Export Inventory Button */}
                <button
                  title="Export Inventory"
                  onClick={handleOpenSidenav}
                  className="border border-yellow-500 text-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-50 flex items-center"
                >
                  <AiOutlineExport />
                </button>
              </div>
            </div>
  
            {/* Products Card */}
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 w-full">
              <div className="flex justify-between mb-4">
                {/* Sort Inputs */}
                <input
                  type="text"
                  placeholder="Search Products"
                  className="border  border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 w-full max-w-xs"
                />
                <select className="border border-blue-300 dark:border-gray-600 rounded-md px-3 py-2 ml-2">
                  <option value="">Sort By</option>
                  <option value="name">Name</option>
                  <option value="category">Category</option>
                  <option value="quantity">Quantity</option>
                  <option value="expiry-date">Expiry Date</option>
                  <option value="sale-rate">Sale Rate (%)</option>
                </select>
              </div>
  
              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-600 dark:text-gray-200">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-6 font-medium">S/N</th>
                      <th className="py-3 px-6 font-medium">Name</th>
                      <th className="py-3 px-6 font-medium">Category</th>
                      <th className="py-3 px-6 font-medium">Quantity</th>
                      <th className="py-3 px-6 font-medium">Expiry Date</th>
                      <th className="py-3 px-6 font-medium">Sale Rate (%)</th>
                      <th className="py-3 px-6 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example Product Rows */}
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <td className="py-3 px-6">1</td>
                      <td className="py-3 px-6">Product 1</td>
                      <td className="py-3 px-6">Category A</td>
                      <td className="py-3 px-6">100</td>
                      <td className="py-3 px-6">2024-12-31</td>
                      <td className="py-3 px-6">10%</td>
                      <td className="py-3 px-6 flex space-x-2">
                        <button className="border border-blue-500 text-blue-500 px-2 py-1 text-xs rounded-md hover:bg-blue-50 flex items-center">
                          Edit
                        </button>
                        <button className="border border-red-500 text-red-500 px-2 py-1 text-xs rounded-md hover:bg-red-50 flex items-center">
                          Delete
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <td className="py-3 px-6">2</td>
                      <td className="py-3 px-6">Product 2</td>
                      <td className="py-3 px-6">Category B</td>
                      <td className="py-3 px-6">50</td>
                      <td className="py-3 px-6">2024-11-30</td>
                      <td className="py-3 px-6">15%</td>
                      <td className="py-3 px-6 flex space-x-2">
                        <button className="border border-blue-500 text-blue-500 px-2 py-1 text-xs rounded-md hover:bg-blue-50 flex items-center">
                          Edit
                        </button>
                        <button className="border border-red-500 text-red-500 px-2 py-1 text-xs rounded-md hover:bg-red-50 flex items-center">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
  
        {/* Sidenav for Export Inventory */}
        <Sidenav
          isOpen={isSidenavOpen}
          onClose={handleCloseSidenav}
          header="Inventory Export"
          description="Export your inventory from multiple stores in PDF or Excel"
          inputs={
            <>
              <div>
                <label className="text-gray-600 dark:text-gray-400 mb-1 block">
                  Select Store
                </label>
                <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full">
                  <option value="">Select...</option>
                  <option value="store1">Store 1</option>
                  <option value="store2">Store 2</option>
                </select>
              </div>
  
              <div>
                <label className="text-gray-600 dark:text-gray-400 mb-1 block">
                  Select preferred file type
                </label>
                <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full">
                  <option value="excel">Excel</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
            </>
          }
          button={
            <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">
              Export
            </button>
          }
        />

{isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-lg shadow-lg relative p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Create New Product
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
              <div 
              onClick={()=>{
                navigate('/product/add/single')
              }}
              className="border cursor-pointer border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center">
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
              <div className="border cursor-pointer border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center">
                <AiOutlineStar
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
              <div className="border cursor-pointer border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center">
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
      </div>

      
    );
  };
  

export default ProductsPage;
