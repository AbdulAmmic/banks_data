import React from 'react';

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  id: string;
  icon?: React.ReactNode; 
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder, id, icon }) => {
  return (
    <div className="form-group mb-5">
      <div className="flex items-center border p-3 w-full rounded">
        {icon && <span className="mr-3">{icon}</span>}
        <input
          className="flex-1 bg-transparent focus:outline-none"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
        />
      </div>
    </div>
  );
};

export default Input;
