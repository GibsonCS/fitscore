
import { useParams } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";
import { EvaluationForm } from "@/components/EvaluationForm";

const EvaluateCandidate = () => {
  const { id } = useParams();
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  if (!id) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Avaliar Candidato</h1>
        <EvaluationForm candidateId={id} />
      </div>
    </div>
  );
};

export default EvaluateCandidate;
