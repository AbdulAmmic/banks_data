
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineShop, AiOutlineQrcode, AiOutlineAppstore, AiOutlineReload } from "react-icons/ai";
import QrScanner from "react-qr-scanner";

interface HeaderProps {
  pendingCount: number;
  onSearchChange: (query: string) => void;
  onNewInventory: () => void; // Add new prop for the new inventory action
}

const Header: React.FC<HeaderProps> = ({ pendingCount, onSearchChange, onNewInventory }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (data: string | null) => {
    if (data) {
      setScanResult(data);
      setIsScanning(false); // Close the scanner when a QR code is scanned
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <div>
      <header className="flex items-center justify-between bg-blue-600 p-4 shadow-lg">
        {/* Back arrow button */}
        <button className="border w-10 border-white bg-white text-blue-600 p-2 rounded-sm hover:bg-blue-100 transition-all duration-300">
          ←
        </button>

        {/* Search bar with QR code scanner */}
        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-1/2">
          <AiOutlineSearch color="grey" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none pl-3 w-full text-gray-700 placeholder-gray-400 py-1"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="ml-3 text-gray-600 hover:text-blue-500" onClick={() => setIsScanning(true)}>
            <AiOutlineQrcode size={20} />
          </button>
        </div>

        {/* Right side icons and new inventory button */}
        <div className="flex items-center space-x-6">
          {/* New Inventory Button */}
          <button
            className="flex items-center space-x-2 text-white hover:bg-green-700 bg-green-500 px-3 py-2 rounded"
            onClick={onNewInventory} // Call the function when clicked
          >
            <AiOutlineReload size={20} />
            <span>Refresh Inventory</span>
          </button>

          {/* Pending Checkouts with notification */}
          <div className="relative">
            <AiOutlineShop size={24} color="white"/>
            {pendingCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </div>

          {/* Menu (Apps) icon */}
          <AiOutlineAppstore size={24} color="white" />
        </div>
      </header>

      {/* QR Code Scanner Modal */}
      {isScanning && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 transition-opacity duration-300 ease-in-out animate-fadeIn"
          onClick={() => setIsScanning(false)} // Close modal on background click
        >
          <div
            className="bg-white p-4 rounded-md shadow-lg transform transition-transform duration-300 scale-95"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <button
              className="mb-4 text-red-500 hover:text-red-600 transition-colors duration-300"
              onClick={() => setIsScanning(false)}
            >
              Close Scanner
            </button>
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", borderRadius: "8px", overflow: "hidden" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
