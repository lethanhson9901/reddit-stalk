import React, { useState } from 'react';
import { Lock, LogIn, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, database } from '../../firebase/config';

const AdminAuth = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      
      try {
        // Sign in with email/password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Check if user exists in admin list
        const adminRef = ref(database, `admins/${userCredential.user.uid}`);
        const adminSnapshot = await get(adminRef);
        
        if (adminSnapshot.exists()) {
          // User is an admin
          onLogin(true);
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('adminUid', userCredential.user.uid);
          navigate('/admin');
        } else {
          // User exists but is not an admin
          setError('Access denied: User is not an administrator');
          await auth.signOut();
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setError('Invalid email or password');
        } else if (error.code === 'auth/too-many-requests') {
          setError('Too many login attempts. Please try again later.');
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <button
        onClick={() => navigate('/')}
        className="text-orange-500 hover:text-orange-600 dark:text-orange-400 flex items-center gap-2 text-sm mb-4"
      >
        <ArrowLeft size={16} />
        Back to Homepage
      </button>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <Lock className="w-6 h-6 text-orange-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;