
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-6">Bem-vindo ao FitScore</h1>
          <p className="text-xl mb-8">Sistema de avaliação preditiva de candidatos</p>
          <Button 
            className="cta-button"
            onClick={() => navigate('/login')}
          >
            Iniciar Avaliação
          </Button>
        </div>
        <Hero />
        <Benefits />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
