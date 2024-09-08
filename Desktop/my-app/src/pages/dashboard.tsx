import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidenav";
import Header from "../components/header";
import { AiOutlineStar, AiOutlineDown, AiOutlinePlus, AiOutlineDollar, AiOutlineFileText, AiOutlineSwap, AiOutlineRise } from "react-icons/ai"; // Import icons
import Datepicker from "react-tailwindcss-datepicker";

type DashboardProps = React.PropsWithChildren<{}>;

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShopsDropdownOpen, setIsShopsDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shopsDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

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
          {/* Welcome Message */}
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Welcome Pharm. Abdurrahman,
          </h1>

          {/* Quick Actions Section */}
          <div className="mb-4 border-b border-gray-300 dark:border-gray-700 pb-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2 flex items-center">
              <AiOutlineStar /> Quick Actions {/* Added the outlined star icon */}
            </h2>
            <div className="flex flex-wrap space-x-2 sm:space-x-1 xs:space-x-0">
              {/* Filled Button */}
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 transform md:scale-100 scale-90">
                <AiOutlinePlus /> Add Product
              </button>

              {/* Outlined Buttons with icons */}
              <button className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-200 transform md:scale-100 scale-90">
                <AiOutlineDollar /> Sell Product
              </button>
           

              {/* Dropdown Button */}
              <div className="relative inline-block text-left" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-200 transform md:scale-100 scale-90"
                >
                  <span>More </span>
                  <AiOutlineDown />
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-10 right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                    <ul className="py-1">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                        >
                          Add Expense
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                        >
                          Add Purchase
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                        >
                          Transfer fund
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2 flex items-center">
              <AiOutlineRise /> Analytics
            </h2>

            {/* Analytics Filters */}
            <div className="flex justify-end space-x-2 sm:space-x-1 xs:space-x-0 mb-4">
  {/* Shops Dropdown */}
  <div className="relative inline-block text-left" ref={shopsDropdownRef}>
    <button
      onClick={toggleShopsDropdown}
      className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-200 transform md:scale-100 scale-90"
    >
      <span>All Shops</span>
      <AiOutlineDown />
    </button>
    {/* Shops Dropdown Menu */}
    {isShopsDropdownOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <ul className="py-1">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              Ammic Shop
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              Shop 2
            </a>
          </li>
          {/* Add more shop options as needed */}
        </ul>
      </div>
    )}
  </div>

  {/* Search Range Input */}
  <div className="relative max-w-sm">
  <button
    onClick={toggleSearchDropdown}
    className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-200 transform md:scale-100 scale-90"
  >
    <span>Search by Date</span>
    <AiOutlineDown />
  </button>
  
  {/* Search Range Dropdown Menu */}
  {isSearchDropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        <input 
          type="date" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Select date"
        />
      </div>
    </div>
  )}
</div>

</div>


            {/* Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Gross Sales</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">NGN 0.00</p>
              </div>

              <div className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Sales</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">NGN 0.00</p>
              </div>

              <div className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">No. of Sales</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">-</p>
              </div>

              <div className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer Debts</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">NGN 0.00</p>
              </div>

              <div className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Growth Profit</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">NGN 0.00</p>
              </div>

              <div className="bg-white border border-silver-300 dark:bg-gray-800 dark:border-silver-600 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">No. of Customers</h3>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">-</p>
              </div>
            </div>
          </div>

          {/* Rendered Children */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
