import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineBoxPlot,
  AiOutlineDollarCircle,
  AiOutlineBarChart,
  AiOutlineTeam,
  AiOutlineMessage,
  AiOutlineSetting,
} from 'react-icons/ai';
import Logo from './logo';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex min-h-screen w-20 bg-blue-700 text-white flex-col justify-between py-4 px-2">
        {/* Header with User Icon */}
        <div className="flex items-center justify-center mb-4">
          <div className="text-blue-200">
            <Logo height={"auto"} />
          </div>
        </div>

        {/* Main Navigation Items */}
        <div className="flex-1 space-y-4 p-2">
          {/* Dashboard */}
          <Link to="/dashboard" className={`flex flex-col items-center mb-4 cursor-pointer ${location.pathname === '/' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
            <AiOutlineHome size={18} />
            <span className="text-xs mt-1">Quick</span>
          </Link>

          {/* Inventory */}
          <Link to="/inventory" className={`flex flex-col items-center mb-4 cursor-pointer ${location.pathname === '/inventory' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
            <AiOutlineBoxPlot size={18} />
            <span className="text-xs mt-1">Inventory</span>
          </Link>

          {/* Payments */}
          <Link to="/payments" className={`flex flex-col items-center mb-4 cursor-pointer ${location.pathname === '/payments' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
            <AiOutlineDollarCircle size={15} />
            <span className="text-xs mt-1">Payments</span>
          </Link>

          {/* Expenses */}
          <Link to="/expenses" className={`flex flex-col items-center mb-4 cursor-pointer ${location.pathname === '/expenses' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
            <AiOutlineBarChart size={15} />
            <span className="text-xs mt-1">Expenses</span>
          </Link>

          {/* Customers */}
          <Link to="/customers" className={`flex flex-col items-center mb-4 cursor-pointer ${location.pathname === '/customers' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
            <AiOutlineTeam size={15} />
            <span className="text-xs mt-1">Customers</span>
          </Link>

          {/* Chat */}
          <Link to="/chat" className={`flex flex-col items-center mb-4 cursor-pointer ${location.pathname === '/chat' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
            <AiOutlineMessage size={15} />
            <span className="text-xs mt-1">Chat</span>
          </Link>

          {/* Settings */}
          <Link to="/settings" className={`flex flex-col items-center mb-4 cursor-pointer ${location.pathname === '/settings' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
            <AiOutlineSetting size={15} />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-blue-800 text-white flex justify-around py-2 shadow-lg">
        {/* Dashboard */}
        <Link to="/dashboard" className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
          <AiOutlineHome size={15} />
        </Link>

        {/* Inventory */}
        <Link to="/inventory" className={`flex flex-col items-center p-2 ${location.pathname === '/inventory' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
          <AiOutlineBoxPlot size={15} />
        </Link>

        {/* Payments */}
        <Link to="/payments" className={`flex flex-col items-center p-2 ${location.pathname === '/payments' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
          <AiOutlineDollarCircle size={15} />
        </Link>

        {/* Expenses */}
        <Link to="/expenses" className={`flex flex-col items-center p-2 ${location.pathname === '/expenses' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
          <AiOutlineBarChart size={15} />
        </Link>

        {/* Customers */}
        <Link to="/customers" className={`flex flex-col items-center p-2 ${location.pathname === '/customers' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
          <AiOutlineTeam size={15} />
        </Link>

        {/* Chat */}
        <Link to="/chat" className={`flex flex-col items-center p-2 ${location.pathname === '/chat' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
          <AiOutlineMessage size={15} />
        </Link>

        {/* Settings */}
        <Link to="/settings" className={`flex flex-col items-center p-2 ${location.pathname === '/settings' ? 'bg-white text-blue-700' : 'text-blue-200'}`}>
          <AiOutlineSetting size={15} />
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
