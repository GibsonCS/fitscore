import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Star,
  Search,
  Clipboard,
  TrendingUp,
  ChartBar,
} from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  experience: string;
  created_at: string;
  fitScore?: number;
}

const Dashboard = () => {
  const { session, loading } = useAuth();
  const supabaseReady = isSupabaseConfigured();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load candidates from localStorage
    const storedCandidates = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );
    setCandidates(storedCandidates);

    // Show demo mode notification
    toast.info("Aplicação rodando em modo demo");
  }, []);

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort candidates by fitScore in descending order to get top candidates
  const topCandidates = [...candidates]
    .filter((candidate) => candidate.fitScore !== undefined)
    .sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0))
    .slice(0, 5);

  // Prepare data for the charts
  const scoreDistributionData = [
    {
      range: "0-20",
      count: candidates.filter(
        (c) => c.fitScore !== undefined && c.fitScore < 20
      ).length,
    },
    {
      range: "21-40",
      count: candidates.filter(
        (c) => c.fitScore !== undefined && c.fitScore >= 20 && c.fitScore < 40
      ).length,
    },
    {
      range: "41-60",
      count: candidates.filter(
        (c) => c.fitScore !== undefined && c.fitScore >= 40 && c.fitScore < 60
      ).length,
    },
    {
      range: "61-80",
      count: candidates.filter(
        (c) => c.fitScore !== undefined && c.fitScore >= 60 && c.fitScore < 80
      ).length,
    },
    {
      range: "81-100",
      count: candidates.filter(
        (c) => c.fitScore !== undefined && c.fitScore >= 80
      ).length,
    },
  ];

  // Get average score
  const averageScore =
    candidates.length > 0
      ? Math.round(
          candidates.reduce((acc, curr) => acc + (curr.fitScore || 0), 0) /
            candidates.length
        )
      : 0;

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
            <Link to={"/"}>
              <Button>Sair</Button>
            </Link>
          </div>
        </div>

        {/* Mini Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Top Candidates Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                Top Candidatos por FitScore
              </CardTitle>
              <CardDescription>
                Candidatos com as melhores avaliações de cultura, performance e
                energia
              </CardDescription>
            </CardHeader>
            <CardContent>
              {topCandidates.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum candidato avaliado ainda
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {topCandidates.map((candidate, index) => (
                    <div
                      key={candidate.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {candidate.position}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge className="bg-green-500">
                          {candidate.fitScore}/100
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Score Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ChartBar className="mr-2 h-5 w-5 text-blue-500" />
                Resumo FitScore
              </CardTitle>
              <CardDescription>
                Visão geral dos scores de candidatos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg text-muted-foreground mb-1">
                    Média FitScore
                  </span>
                  <div className="text-4xl font-bold">{averageScore}</div>
                </div>

                <div className="h-[200px] w-full">
                  {candidates.length > 0 ? (
                    <ChartContainer
                      config={{
                        score: {
                          theme: {
                            light: "#3b82f6",
                            dark: "#60a5fa",
                          },
                        },
                      }}
                    >
                      <BarChart data={scoreDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar
                          dataKey="count"
                          name="Candidatos"
                          fill="var(--color-score)"
                        />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Sem dados suficientes para exibir o gráfico
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
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
                <h3 className="text-lg font-medium">
                  Nenhum candidato encontrado
                </h3>
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
                          <p className="text-sm text-muted-foreground mb-2">
                            {candidate.position}
                          </p>
                          <div className="text-xs text-muted-foreground mb-3">
                            Email: {candidate.email} • Tel:{" "}
                            {candidate.phone || "N/A"}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Experiência:</span>{" "}
                              {candidate.experience}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center text-amber-500">
                            {candidate.fitScore !== undefined ? (
                              <Badge
                                variant={
                                  candidate.fitScore >= 80
                                    ? "default"
                                    : candidate.fitScore >= 60
                                    ? "secondary"
                                    : "outline"
                                }
                                className={
                                  candidate.fitScore >= 80
                                    ? "bg-green-500"
                                    : candidate.fitScore >= 60
                                    ? "bg-amber-500"
                                    : ""
                                }
                              >
                                FitScore: {candidate.fitScore}
                              </Badge>
                            ) : (
                              <>
                                <Star className="fill-amber-500 h-4 w-4" />
                                <Star className="fill-amber-500 h-4 w-4" />
                                <Star className="fill-amber-500 h-4 w-4" />
                                <Star className="h-4 w-4" />
                                <Star className="h-4 w-4" />
                              </>
                            )}
                          </div>
                          {/* <Button size="sm" variant="outline">
                            Avaliar
                          </Button> */}
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
          {session
            ? `Usuário logado: ${session.user.email}`
            : "Modo demo ativo"}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
