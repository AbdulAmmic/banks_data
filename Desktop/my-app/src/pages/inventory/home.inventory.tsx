import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/sidenav"; 
import Header from "../../components/header"; 
import {  AiOutlineStar} from "react-icons/ai";
import { useNavigate } from "react-router-dom"; 
// import Datepicker from "react-tailwindcss-datepicker";

type InventoryHomeProps = React.PropsWithChildren<{}>;

const InventoryHome: React.FC<InventoryHomeProps> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShopsDropdownOpen, setIsShopsDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shopsDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); 

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to toggle the shops dropdown
  const toggleShopsDropdown = () => {
    setIsShopsDropdownOpen(!isShopsDropdownOpen);
  };

  // Function to toggle the search range dropdown
  const toggleSearchDropdown = () => {
    setIsSearchDropdownOpen(!isSearchDropdownOpen);
  };

  // Function to handle clicks outside of the dropdowns
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      shopsDropdownRef.current &&
      !shopsDropdownRef.current.contains(event.target as Node) &&
      searchDropdownRef.current &&
      !searchDropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
      setIsShopsDropdownOpen(false);
      setIsSearchDropdownOpen(false);
    }
  };

  // Attach the event listener to the document when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

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
          Home / Inventory
          </h1>

         

          {/* Analytics Section */}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-800 dark:text-white mb-2 flex items-center">
              <AiOutlineStar />  Click to access what you are looking for
            </p>

           
            {/* Inventory Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div
                className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-10 ounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => navigate("/inventory/products")}
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Products</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">View Products</p>
              </div>

              <div
                className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-10 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => navigate("/inventory/analytics")}
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Analytics</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">View Analytics</p>
              </div>

              <div
                className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-10  rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => navigate("/inventory/categories")}
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Categories</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">View Categories</p>
              </div>

              <div
                className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-10 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => navigate("/inventory/stores")}
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Stores</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">View Stores</p>
              </div>

              <div
                className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-10 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => navigate("/inventory/suppliers")}
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Suppliers</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">View Suppliers</p>
              </div>

              <div
                className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-10 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => navigate("/inventory/sales-transactions")}
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sales Transactions</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">View Sales Transactions</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryHome;
