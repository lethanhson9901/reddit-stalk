// src/firebase/admin.js
import { ref, set } from 'firebase/database';
import { database } from './config';

export const setupInitialAdmin = async (uid) => {
  try {
    await set(ref(database, `admins/${uid}`), true);
    console.log('Admin setup complete');
  } catch (error) {
    console.error('Error setting up admin:', error);
  }
};