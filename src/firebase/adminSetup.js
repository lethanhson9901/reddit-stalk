// src/firebase/adminSetup.js
import { ref, get, set } from 'firebase/database';
import { database, auth } from './config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const initializeAdmin = async (email, password, adminKey) => {
  try {
    // First check if any admin exists
    const adminsRef = ref(database, 'admins');
    const adminsSnapshot = await get(adminsRef);
    
    if (adminsSnapshot.exists()) {
      throw new Error('Admin already initialized');
    }

    // Verify the admin initialization key
    if (adminKey !== process.env.REACT_APP_ADMIN_INIT_KEY) {
      throw new Error('Invalid initialization key');
    }

    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Set up admin privileges
    await set(ref(database, `admins/${uid}`), true);

    return { success: true, message: 'Admin initialized successfully' };
  } catch (error) {
    console.error('Admin initialization error:', error);
    return { success: false, message: error.message };
  }
};