// src/components/admin/EnvTest.jsx
import React from 'react';

const EnvTest = () => {
  console.log('Environment variables:', {
    hasApiKey: !!process.env.REACT_APP_FIREBASE_API_KEY,
    hasAuthDomain: !!process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    hasProjectId: !!process.env.REACT_APP_FIREBASE_PROJECT_ID,
  });

  return null;
};

export default EnvTest;