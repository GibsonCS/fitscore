
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, UserPlus } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@fitscore.com');
  const [password, setPassword] = useState('senha123');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const supabaseConfigured = isSupabaseConfigured();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      if (!supabaseConfigured) return;
      
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log("User already logged in, redirecting to dashboard");
        navigate('/dashboard');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!supabaseConfigured) {
        // Use demo mode if Supabase isn't configured
        console.log("Login in demo mode, redirecting to dashboard");
        toast.success('Login em modo demo realizado com sucesso!');
        
        navigate('/dashboard', { replace: true }); 
        return;
      }

      let response;
      
      if (isRegister) {
        // Register new user
        response = await supabase.auth.signUp({
          email,
          password,
        });
      } else {
        // Login existing user
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (response.error) throw response.error;

      console.log(isRegister ? "Registration successful" : "Login successful", "redirecting to dashboard");
      toast.success(isRegister 
        ? 'Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.' 
        : 'Login realizado com sucesso!');
      
      // Force a timeout before navigation to ensure toast is visible
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 300);
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || 'Erro ao fazer login/cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isRegister ? 'Cadastro FitScore' : 'Login FitScore'}</CardTitle>
          <CardDescription>
            {isRegister 
              ? 'Crie sua conta para acessar o dashboard de avaliação de candidatos'
              : 'Entre para acessar o dashboard de avaliação de candidatos'}
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
          <form onSubmit={handleAuth} className="space-y-4">
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
              {loading ? 'Processando...' : isRegister ? 'Cadastrar' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Já tem uma conta? Entre' : 'Novo por aqui? Cadastre-se'}
            {!isRegister && <UserPlus className="ml-2 h-4 w-4" />}
          </Button>
          {supabaseConfigured && (
            <div className="text-xs text-muted-foreground text-center">
              {isRegister ? 'Ao se cadastrar você concorda com os termos de uso do FitScore' : 
                'Use demo@fitscore.com e senha123 para testar (crie uma conta primeiro)'}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
