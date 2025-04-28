
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleCTAClick = () => {
    if (session) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="w-full py-16 md:py-28 px-4 md:px-8 bg-gradient-hero flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Avaliação <span className="text-gradient">Preditiva</span> de Candidatos
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          FitScore LEGAL utiliza inteligência artificial para avaliar candidatos em três pilares essenciais: 
          <span className="text-fitscore-blue font-medium"> Cultura</span>, 
          <span className="text-fitscore-purple font-medium"> Performance</span> e 
          <span className="text-fitscore-pink font-medium"> Energia</span>.
        </p>
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button 
            className="cta-button text-white px-8 py-6 text-lg rounded-full"
            onClick={handleCTAClick}
          >
            <span>Quero Avaliar Talentos</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="pt-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-2 flex justify-between">
            <div className="text-center px-4">
              <h3 className="text-3xl font-bold text-fitscore-blue">100%</h3>
              <p className="text-xs text-gray-500">Baseado em dados</p>
            </div>
            <div className="text-center px-4 border-x border-gray-200">
              <h3 className="text-3xl font-bold text-fitscore-purple">3x</h3>
              <p className="text-xs text-gray-500">Mais rápido</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-3xl font-bold text-fitscore-pink">95%</h3>
              <p className="text-xs text-gray-500">Precisão</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
