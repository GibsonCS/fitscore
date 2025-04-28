
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@fitscore.com');
  const [password, setPassword] = useState('senha123');
  const [loading, setLoading] = useState(false);
  const supabaseConfigured = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!supabaseConfigured) {
        // Use demo mode if Supabase isn't configured
        toast.success('Login em modo demo realizado com sucesso!');
        navigate('/dashboard');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login FitScore</CardTitle>
          <CardDescription>
            Entre para acessar o dashboard de avaliação de candidatos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!supabaseConfigured && (
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Modo DEMO ativo. Clique em Entrar para acessar o dashboard sem autenticação real.
              </AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full cta-button mt-4"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
