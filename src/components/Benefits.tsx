
import React from 'react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Decisões Estratégicas",
      description: "Tome decisões de contratação baseadas em dados concretos, com pontuações de 0 a 100 para cada candidato."
    },
    {
      icon: "⚡",
      title: "Processo Acelerado",
      description: "Reduza o tempo de seleção com análise automatizada e semântica das respostas dos candidatos."
    },
    {
      icon: "🔍",
      title: "Avaliação Completa",
      description: "Analise os três pilares essenciais: Cultura, Performance e Energia para contratações alinhadas."
    }
  ];

  return (
    <section id="beneficios" className="w-full py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Benefícios do FitScore</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa solução traz vantagens competitivas imediatas para o seu processo de recrutamento e seleção.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="benefits-card bg-white rounded-xl p-6 card-shadow border border-gray-100 opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
