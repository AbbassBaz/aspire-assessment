import React from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading..." />;
  }

  return user ? <Dashboard user={user} /> : <AuthForm />;
}

export default App;