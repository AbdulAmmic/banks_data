import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface SidenavProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  description?: string;
  inputs: React.ReactNode;
  button: React.ReactNode;
}

const Sidenav: React.FC<SidenavProps> = ({
  isOpen,
  onClose,
  header,
  description,
  inputs,
  button,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 ${
          isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidenav */}
      <div
        className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-80`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-200"
          >
            <AiOutlineArrowRight size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Header */}
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {header}
          </h2>

          {/* Description (Optional) */}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {description}
            </p>
          )}

          {/* Inputs */}
          <div className="space-y-4">{inputs}</div>

          {/* Button */}
          <div className="mt-6">{button}</div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
