import React, { useState } from 'react';
import '../index.css';
import Input from '../components/input';
import SearchInput from '../components/searchInput';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import Logo from '../components/logo';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = (any) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Sign Up');
  const navigate = useNavigate();

  const companySuggestions = [
    "Aneela Chops",
    "Katankana Chops",
    "ScKm Foods",
 
  ];

  const handleSearch = (query: string) => {
   
    const filteredcompanys = companySuggestions.filter((company) =>
      company.toLowerCase().includes(query.toLowerCase())
    );
    setCompany(query);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setButtonText('Loading...');

    setTimeout(() => {
      console.log('Signup data:', { name, email, phone, company, password });
      setButtonText('Sign Up');
    }, 2000);
  };

  return (
    <div className=" text-sm  text-slate-500 flex flex-col items-center justify-center w-full p-5 min-h-screen bg-gray-100">
      <div className="bg-white mt-10 sm:mt-20 mx-4 sm:mx-12 w-full sm:w-2/3 lg:w-1/3 rounded-xl p-5 text-center shadow-lg">
        <header className="flex items-center justify-center p-2 -mt-3">
          <Logo height={60} />
        </header>
        <h2 className="font-bold text-2xl text-slate-500 mb-5">Signup</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            icon={<FaUser />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            id="name"
          />

          <Input
            type="email"
            icon={<FaEnvelope />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            id="email"
          />

          <Input
            type="tel"
            icon={<FaPhone />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Your Phone Number"
            id="phone"
          />

          <SearchInput
            placeholder="Company / Startup"
            onSearch={handleSearch}
            suggestions={companySuggestions}
          />

          <Input
            type="password"
            icon={<FaLock />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            id="password"
          />

        <div className="bg-amber-500 flex justify-between items-center space-x-4 mt-5 rounded">
            <button
              type="submit"
              className="bg-amber-500 text-white border-0 py-2 px-4   rounded-l-lg w-full hover:bg-amber-600 transition"
            >
              Signup
            </button>
            <button
              type="submit"
              onClick={()=> navigate('/auth/login')}
              className="bg-slate-300 text-slate-600 border-0 py-2 px-4 rounded-r w-full hover:bg-slate-400 transition"
            >
             Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
