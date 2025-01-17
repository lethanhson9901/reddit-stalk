import React from 'react';
import { Search, Github, Moon, Sun } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, darkMode, setDarkMode }) => (
  <header className="fixed top-0 w-full z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-8" />
        <button 
          onClick={() => window.location.href = `${process.env.PUBLIC_URL || '/reddit-stalk'}`}
          className="text-xl font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <span className="text-orange-500">Reddit</span>
          <span className="dark:text-white">Stalk</span>
        </button>
      </div>

      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1.5 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <a 
          href="https://github.com/lethanhson9901/reddit-stalk" 
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title="View on GitHub"
        >
          <Github size={20} />
        </a>
      </div>
    </div>
  </header>
);

export default Header;