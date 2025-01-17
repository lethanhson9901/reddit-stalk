import React from 'react';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, communities, selectedCommunity, onSelectCommunity }) => (
  <div className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-800 w-64 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out ${!isOpen ? '-translate-x-64' : 'translate-x-0'} z-20`}>
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Communities</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        {communities.map((community, index) => (
          <button 
            key={index}
            onClick={() => {
              onSelectCommunity(community);
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 mb-1 rounded-md transition-colors ${
              selectedCommunity === community
                ? 'bg-orange-500 text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {community}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Made with ❤️ by{" "}
          <a 
            href="https://github.com/lethanhson9901" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
          >
            Son Le
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;