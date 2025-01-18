import React, { useState } from 'react';
import { auth, database } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const AdminInitialization = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate email format
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate password length
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // First check if admins node exists
      const adminsRef = ref(database, 'admins');
      try {
        const adminsSnapshot = await get(adminsRef);
        if (adminsSnapshot.exists()) {
          throw new Error('Admin already initialized');
        }
      } catch (dbError) {
        if (dbError.code === 'PERMISSION_DENIED') {
          throw new Error('Database permission denied. Please check your Firebase rules.');
        }
        throw dbError;
      }

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Set up first admin
      try {
        await set(ref(database, `admins/${uid}`), true);
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } catch (setError) {
        if (setError.code === 'PERMISSION_DENIED') {
          // Clean up the auth state since admin creation failed
          await auth.signOut();
          throw new Error('Failed to set admin privileges. Please check database permissions.');
        }
        throw setError;
      }
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

        {process.env.REACT_APP_FIREBASE_DATABASE_URL && 
         !process.env.REACT_APP_FIREBASE_DATABASE_URL.includes('asia-southeast1') && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/50 rounded-md">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="text-sm text-yellow-700 dark:text-yellow-400">
                Warning: Your database is in a different region. Consider using the Asia Southeast 1 region for better performance.
              </div>
            </div>
          </div>
        )}

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