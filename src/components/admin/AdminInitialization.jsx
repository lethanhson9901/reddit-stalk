import React, { useState, useEffect } from 'react';
import { auth, database } from '../../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const AdminInitialization = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initKey, setInitKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch the admin initialization key from environment
  const ADMIN_INIT_KEY = process.env.REACT_APP_ADMIN_INIT_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error('Please enter a valid email address');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      if (initKey !== ADMIN_INIT_KEY) {
        throw new Error('Invalid initialization key');
      }

      // Check if admins node exists and is empty
      const adminsRef = ref(database, 'admins');
      const adminsSnapshot = await get(adminsRef);
      
      if (adminsSnapshot.exists() && Object.keys(adminsSnapshot.val()).length > 0) {
        throw new Error('Admin account already initialized');
      }

      // Create user and set admin privileges
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Set admin privileges
      await set(ref(database, `admins/${uid}`), true);

      // Store admin status in local storage
      localStorage.setItem('isAdmin', 'true');

      // Redirect to admin page
      navigate('/admin');
    } catch (error) {
      console.error('Admin initialization error:', error);
      setError(error.message || 'Failed to initialize admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Initialize Admin Account
        </h2>

        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/50 rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="text-sm text-yellow-700 dark:text-yellow-400">
              This page is used for initial admin setup. You can only do this once.
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
              placeholder="Enter admin email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
              placeholder="Create admin password"
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Initialization Key
            </label>
            <input
              type="password"
              value={initKey}
              onChange={(e) => setInitKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
              placeholder="Enter initialization key"
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Initializing...' : 'Initialize Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminInitialization;