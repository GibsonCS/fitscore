
import React from 'react';
import { useAuth } from '@/lib/auth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard FitScore</h1>
          <Button asChild>
            <Link to="/candidates/new">
              <UserPlus className="mr-2" />
              Novo Candidato
            </Link>
          </Button>
        </div>
        <div className="grid gap-6">
          {/* O conteúdo do dashboard será implementado em seguida */}
          <p>Bem-vindo ao Dashboard do FitScore!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
