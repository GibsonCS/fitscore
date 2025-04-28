import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const CTA: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleCTAClick = () => {
    if (session) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleCandidateClick = () => {
    navigate('/candidates/new');
  };

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-r from-fitscore-blue/10 to-fitscore-purple/10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Revolucione seu Processo de Seleção</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          Junte-se a empresas que estão transformando suas contratações com decisões baseadas em dados objetivos e compatibilidade real.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="cta-button text-white px-8 py-6 text-lg rounded-full opacity-0 animate-fade-in"
            onClick={handleCTAClick}
          >
            <span>Quero Avaliar Talentos</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button 
            variant="outline"
            className="px-8 py-6 text-lg rounded-full opacity-0 animate-fade-in"
            onClick={handleCandidateClick}
          >
            <span>Quero me Candidatar</span>
            <UserPlus className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="text-center">
            <div className="text-5xl font-bold text-gradient">500+</div>
            <p className="text-gray-500">Candidatos Avaliados</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gradient">85%</div>
            <p className="text-gray-500">Redução no Turnover</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gradient">30%</div>
            <p className="text-gray-500">Aumento na Performance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
