import React from 'react';
import { Link } from "react-router-dom";
import logo from '../logo.svg';

const Header = () => {
  return (
    <header>
      <nav className='bg-white shadow'>
        <div className='container flex items-center justify-between p-6 mx-auto text-slate-800 capitalize'>
          <a href="/" className='flex'>
            <img className='rounded-full w-auto h-6 sm:h-7' src={logo} alt='Logo' />
            <h1 className='text-lg font-bold mx-2'>Friends Manager</h1>
          </a>
          <ul className="sm:flex lg:gap-x-12">
            <li className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform hover:border-blue-500 mx-1.5 sm:mx-6"><Link to="/">friends</Link></li>
            <li className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform hover:border-blue-500 mx-1.5 sm:mx-6"><Link to="/friend/add">add friend</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
