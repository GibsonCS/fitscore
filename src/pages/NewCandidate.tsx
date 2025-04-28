import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";
import { CandidateForm } from "@/components/CandidateForm";

const NewCandidate: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cadastrar Novo Candidato</h1>
        <CandidateForm />
      </div>
    </div>
  );
};
export default NewCandidate;
