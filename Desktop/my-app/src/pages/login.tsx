import React, { useState } from 'react';
import '../index.css';
import Input from '../components/input';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Logo from '../components/logo';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Login');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setButtonText('Loading...');

    setTimeout(() => {
      if (email === 'ammic@ammic' && password === '1234') {
        alert('Logged');
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
      setButtonText('Login');
    }, 2000);
  };

  return (
    <>
      <div className="text-slate-500 flex flex-col items-center justify-center w-full p-5 min-h-screen bg-blue-100">
        <div className="bg-white mt-10 sm:mt-20 mx-4 sm:mx-12 w-full sm:w-2/3 lg:w-1/3 rounded-xl p-5 text-center shadow-lg">
          <header className="flex items-center justify-center p-2 -mt-3">
            <Logo height={60} />
          </header>
          <h2 className="font-bold text-2xl text-slate-500 mb-5">Login</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              icon={<FaEnvelope />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              id="email"
            />

            <Input
              type="password"
              icon={<FaLock />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              id="password"
            />

            <div className="flex justify-center items-center space-x-4 mt-5">
              <button
                type="submit"
                className="bg-blue-500 text-white border-0 py-2 px-4 rounded w-full hover:bg-blue-600 transition"
              >
                {buttonText}
              </button>
            </div>
          </form>
          <button
            onClick={() => navigate('/forgot-password')}
            className="mt-3 text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
      {/* Ensure ToastContainer is outside any potential conditional renders */}
      {/* <ToastContainer /> */}
    </>
  );
};

export default Login;
