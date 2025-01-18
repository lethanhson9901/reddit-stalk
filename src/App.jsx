import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AppContent from './AppContent';
import AdminInitialization from './components/admin/AdminInitialization';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/admin/initialize" element={
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <AdminInitialization />
          </div>
        } />
        <Route path="/*" element={<AppContent darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;