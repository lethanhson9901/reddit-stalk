// src/components/ThemeToggle.jsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    onClick={onToggle}
    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    aria-label="Toggle theme"
  >
    {isDark ? 
      <Sun className="h-5 w-5 text-orange-500" /> : 
      <Moon className="h-5 w-5 text-blue-600" />
    }
  </button>
);

export default ThemeToggle;

