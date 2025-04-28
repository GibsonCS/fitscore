
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Questionário Inteligente",
      description: "Candidatos respondem a perguntas estratégicas desenvolvidas com base em neurociência e psicologia."
    },
    {
      number: "02",
      title: "Análise Semântica por IA",
      description: "Nossa IA analisa as respostas semanticamente, considerando cultura, performance e energia."
    },
    {
      number: "03",
      title: "FitScore™ Gerado",
      description: "Um score de 0 a 100 é gerado para cada candidato, permitindo uma análise objetiva e comparativa."
    }
  ];

  return (
    <section id="como-funciona" className="w-full py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Como Funciona</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Um processo simples e eficiente para avaliar seus candidatos com precisão.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="step-card flex-1 rounded-xl bg-white p-6 card-shadow relative opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <div className="absolute -top-5 left-6 bg-gradient-to-r from-fitscore-blue to-fitscore-purple text-white text-lg font-bold rounded-lg px-3 py-1">
                {step.number}
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                alt="FitScore Dashboard" 
                className="w-full h-auto max-w-4xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="text-xl font-bold">Painel de Recrutadores</h4>
                  <p className="text-sm">Visualize o ranking dos candidatos e analise os dados de forma fácil e intuitiva</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
