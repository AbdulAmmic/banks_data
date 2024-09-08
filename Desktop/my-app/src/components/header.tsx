import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
          
          </div>

     
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                width="20"
                height="20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.5 15a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm0-1.5a5 5 0 100-10 5 5 0 000 10zM14.293 14.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22a2 2 0 01-2-2h4a2 2 0 01-2 2zm6-6V9A6 6 0 006 9v7a2 2 0 01-2 2h16a2 2 0 01-2-2zM18 8a6 6 0 10-12 0v6h12V8z" />
              </svg>
              <span className="sr-only">Notifications</span>
            </button>

            <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 4h16v2H4V4zm0 4h10v2H4V8zm0 4h8v2H4v-2zm0 4h6v2H4v-2z" />
              </svg>
              <span className="sr-only">Messages</span>
            </button>

            <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 10H8.83L7 14.83V5h12v8z" />
              </svg>
              <span className="sr-only">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
