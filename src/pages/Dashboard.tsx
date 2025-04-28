
import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus, Star, AlertTriangle } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { session, loading } = useAuth();
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    // Verificar se o Supabase está configurado e mostrar uma mensagem
    if (!supabaseReady) {
      toast.info('Aplicação rodando em modo demo');
    }
  }, [supabaseReady]);

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

  // Redirecionar para login apenas se não tiver sessão e o Supabase estiver configurado
  if (!session && !loading && supabaseReady) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard FitScore</h1>
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/candidates/new">
                <UserPlus className="mr-2" />
                Novo Candidato
              </Link>
            </Button>
          </div>
        </div>
        
        {!supabaseReady && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Configuração necessária</AlertTitle>
            <AlertDescription>
              O Supabase não está configurado. Conecte seu projeto ao Supabase clicando no botão verde "Supabase" no canto superior direito da interface para habilitar recursos de backend.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-6">
          {/* O conteúdo do dashboard será implementado em seguida */}
          <p>Bem-vindo ao Dashboard do FitScore!</p>
          <p>{session ? `Usuário logado: ${session.user.email}` : 'Modo demo ativo'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
