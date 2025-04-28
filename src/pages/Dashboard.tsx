
import React from 'react';
import { useAuth } from '@/lib/auth';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard FitScore</h1>
        <div className="grid gap-6">
          {/* Aqui será implementado o conteúdo do dashboard */}
          <p>Bem-vindo ao Dashboard do FitScore!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
