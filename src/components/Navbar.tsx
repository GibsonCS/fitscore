
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  return (
    <nav className="w-full py-4 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gradient">FitScore</h1>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <a href="#como-funciona" className="text-sm font-medium text-gray-600 hover:text-fitscore-blue">Como Funciona</a>
        <a href="#beneficios" className="text-sm font-medium text-gray-600 hover:text-fitscore-blue">Benefícios</a>
        <a href="#contato" className="text-sm font-medium text-gray-600 hover:text-fitscore-blue">Contato</a>
        {session && (
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="text-sm font-medium"
          >
            Dashboard
          </Button>
        )}
      </div>
      <Button 
        className="cta-button text-white px-4 py-2"
        onClick={() => navigate(session ? '/dashboard' : '/login')}
      >
        {session ? 'Dashboard' : 'Entrar'}
      </Button>
    </nav>
  );
};

export default Navbar;
