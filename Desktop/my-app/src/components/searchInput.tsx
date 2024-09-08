import React, { useState, useEffect, useRef } from 'react';
import { FaHamburger } from 'react-icons/fa';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  suggestions: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch, suggestions }) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query === '') {
      setFilteredSuggestions(suggestions.slice(0, 3));
    } else {
      const filtered = suggestions.filter(school =>
        school.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [query, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
    setIsOpen(true);
  };

  const handleSelect = (school: string) => {
    setQuery(school);
    setIsOpen(false);
    onSearch(school);
  };

  return (
    <div className="form-group mb-5 relative" ref={containerRef}>
      <div className="flex items-center border p-3 w-full rounded bg-white">
        <span className="mr-3 text-gray-500">
          <FaHamburger />
        </span>
        <input
          className="flex-1 bg-transparent focus:outline-none"
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 border bg-white w-full mt-2 rounded shadow-lg max-h-60 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((school, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(school)}
              >
                {school}
              </li>
            ))
          ) : (
            <li className="py-2 px-4 text-gray-500">No schools found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
