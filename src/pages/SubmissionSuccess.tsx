import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SubmissionSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Formulário Enviado com Sucesso!
          </h1>
          <p className="text-lg mb-8">
            Obrigado por se candidatar. Seus dados foram recebidos e serão
            analisados pelo nosso time de recrutamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/")}>
              Voltar para a Página Inicial
            </Button>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Ir para o Dashboard (Demo)
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default SubmissionSuccess;
