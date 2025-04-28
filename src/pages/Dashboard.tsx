
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus, Star, Search, Clipboard } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  experience: string;
  skills: string;
  created_at: string;
}

const Dashboard = () => {
  const { session, loading } = useAuth();
  const supabaseReady = isSupabaseConfigured();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load candidates from localStorage
    const storedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    setCandidates(storedCandidates);
    
    // Show demo mode notification
    toast.info('Aplicação rodando em modo demo');
  }, []);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="h-24 w-full mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard FitScore</h1>
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/candidate-form">
                <UserPlus className="mr-2" />
                Novo Candidato
              </Link>
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gestão de Candidatos</CardTitle>
            <CardDescription>
              Visualize e analise os candidatos que se inscreveram no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar candidatos..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredCandidates.length === 0 ? (
              <div className="text-center py-12">
                <Clipboard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhum candidato encontrado</h3>
                <p className="text-muted-foreground">
                  {candidates.length === 0 
                    ? "Ainda não há candidatos no sistema. Adicione novos candidatos ou aguarde inscrições."
                    : "Nenhum candidato corresponde à sua pesquisa. Tente outros termos."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => (
                  <Card key={candidate.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{candidate.name}</h3>
                            <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{candidate.position}</p>
                          <div className="text-xs text-muted-foreground mb-3">
                            Email: {candidate.email} • Tel: {candidate.phone || 'N/A'}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm"><span className="font-medium">Experiência:</span> {candidate.experience}</p>
                            <p className="text-sm"><span className="font-medium">Habilidades:</span> {candidate.skills}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center text-amber-500">
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="h-4 w-4" />
                            <Star className="h-4 w-4" />
                          </div>
                          <Button size="sm" variant="outline">
                            Avaliar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground">
          {session ? `Usuário logado: ${session.user.email}` : 'Modo demo ativo'}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
