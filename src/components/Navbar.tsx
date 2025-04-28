
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gradient">FitScore</h1>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <a href="#como-funciona" className="text-sm font-medium text-gray-600 hover:text-fitscore-blue">Como Funciona</a>
        <a href="#beneficios" className="text-sm font-medium text-gray-600 hover:text-fitscore-blue">Benefícios</a>
        <a href="#contato" className="text-sm font-medium text-gray-600 hover:text-fitscore-blue">Contato</a>
      </div>
      <Button className="cta-button text-white px-4 py-2">Entrar</Button>
    </nav>
  );
};

export default Navbar;
