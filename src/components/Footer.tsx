
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="w-full py-12 px-4 md:px-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-gradient mb-4">FitScore</h3>
            <p className="text-gray-300 mb-6 max-w-sm">
              Avaliação preditiva de candidatos usando inteligência artificial para decisões estratégicas de contratação.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.012 10.012 0 01-3.127 1.195 4.926 4.926 0 00-8.391 4.494A13.939 13.939 0 011.64 3.161a4.93 4.93 0 001.524 6.572A4.9 4.9 0 01.96 9.116v.061a4.923 4.923 0 003.95 4.828 4.905 4.905 0 01-2.224.084 4.93 4.93 0 004.6 3.419A9.87 9.87 0 010 19.289a13.89 13.89 0 007.548 2.209c9.054 0 14.004-7.5 14.004-14.001 0-.21-.005-.42-.014-.639A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Início</a></li>
              <li><a href="#como-funciona" className="text-gray-300 hover:text-white">Como Funciona</a></li>
              <li><a href="#beneficios" className="text-gray-300 hover:text-white">Benefícios</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Preços</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">contato@fitscore.com.br</li>
              <li className="text-gray-300">+55 (11) 9999-9999</li>
              <li className="text-gray-300">São Paulo, SP - Brasil</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FitScore. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
