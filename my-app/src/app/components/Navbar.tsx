'use client';

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaBook } from "react-icons/fa"; // Book icon for knowledge

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const logoRef = useRef<HTMLDivElement>(null); // Ref for logo animation

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.error('MetaMask is not detected');
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAccount(accounts[0]); // Store the first account address
        console.log('Connected account:', accounts[0]);
      } catch (error) {
        console.error("User denied wallet connection or another error occurred:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 bg-transparent z-50">
      <div 
        ref={logoRef} 
        className="flex items-center font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500" // Greenish-blue gradient
      >
        <FaBook className="mr-2 text-yellow-400 text-2xl animate-bounce" /> {/* Book icon */}
        <a href="/" className="hover:text-yellow-300 transition duration-300">IntelliQuest</a>
      </div>
      <button 
        onClick={isConnected ? undefined : connectWallet} 
        className={`text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 transition duration-300 px-4 py-2 rounded-lg shadow-lg transform hover:scale-105`}
      >
        {isConnected ? `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}` : "Connect MetaMask"}
      </button>
    </nav>
  );
};

export default Navbar;
