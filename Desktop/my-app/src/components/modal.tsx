import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";


interface Category {
  id?: number;
  name: string;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  onSave: (category: Category) => void;
  category: Category | null;
  
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, header, onSave, category }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [category]);

  const handleSave = () => {
    onSave({ id: category?.id, name, description });
  };

  return (
    <>
      {/* RGB Overlay */}
      {isOpen && <div className="fixed inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 z-40"></div>}
      <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <Dialog.Panel className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg p-6 w-full max-w-md modal-animation">
          <Dialog.Title as="h3" className="text-xl font-semibold mb-4">
            {header}
          </Dialog.Title>
          <div>
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
              placeholder="Enter category name"
            />
          </div>
          <div className="mt-4">
            <label className="text-gray-600 dark:text-gray-400 mb-1 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full"
              placeholder="Enter category description"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Modal;
