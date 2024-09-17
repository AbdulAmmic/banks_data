import React, { useState } from "react";

interface SearchableSelectProps {
  options: { id: number; label: string }[];
  onSelect: (selectedOption: { id: number; label: string }) => void;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ options, onSelect, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionSelect = (option: { id: number; label: string }) => {
    setSearchTerm(option.label);
    onSelect(option);
    setIsOpen(false); // Close the dropdown when an option is selected
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={placeholder || "Search..."}
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)} // Open the dropdown on input focus
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {isOpen && filteredOptions.length === 0 && (
        <p className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg px-4 py-2 text-gray-500">
          No results found
        </p>
      )}
    </div>
  );
};

export default SearchableSelect;
