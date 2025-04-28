import React from "react";
import { CandidateForm } from "@/components/CandidateForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CandidateFormPage: React.FC = () => {
  const navigate = useNavigate();

  const handleFormSubmitted = async (data: any) => {
    try {
      const fitScore = Math.floor(Math.random() * 101);

      const candidates = JSON.parse(localStorage.getItem("candidates") || "[]");
      const newCandidate = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        fitScore: fitScore,
      };

      candidates.push(newCandidate);
      localStorage.setItem("candidates", JSON.stringify(candidates));

      toast.success("Formulário enviado com sucesso!");
      navigate("/submission-success");
    } catch (error) {
      toast.error("Erro ao enviar formulário. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Formulário de Candidatura
            </CardTitle>
            <CardDescription>
              Preencha seus dados para iniciar o processo de avaliação preditiva
              baseada em Cultura, Performance e Energia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CandidateForm onSubmitSuccess={handleFormSubmitted} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
export default CandidateFormPage;
