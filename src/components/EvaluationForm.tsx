
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  technical_score: z.number().min(0).max(100),
  soft_skills_score: z.number().min(0).max(100),
  experience_score: z.number().min(0).max(100),
  culture_fit_score: z.number().min(0).max(100),
  culture_score: z.number().min(0).max(100),
  performance_score: z.number().min(0).max(100),
  energy_score: z.number().min(0).max(100),
  comments: z.string().optional(),
});

interface EvaluationFormProps {
  candidateId: string;
}

export function EvaluationForm({ candidateId }: EvaluationFormProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technical_score: 50,
      soft_skills_score: 50,
      experience_score: 50,
      culture_fit_score: 50,
      culture_score: 50,
      performance_score: 50,
      energy_score: 50,
      comments: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.from("evaluations").insert({
        ...values,
        candidate_id: candidateId,
        evaluator_id: user?.id,
      });

      if (error) throw error;

      toast.success("Avaliação registrada com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Erro ao registrar avaliação: " + error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="technical_score"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Avaliação Técnica</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[value]}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
              <FormDescription>
                Avalie as habilidades técnicas do candidato (0-100)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="soft_skills_score"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Soft Skills</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[value]}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
              <FormDescription>
                Avalie as habilidades interpessoais do candidato (0-100)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience_score"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Experiência</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[value]}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
              <FormDescription>
                Avalie a experiência profissional do candidato (0-100)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="culture_fit_score"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Fit Cultural</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[value]}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
              <FormDescription>
                Avalie o alinhamento cultural do candidato (0-100)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-medium mb-4">Atributos pessoais</h3>
          
          <FormField
            control={form.control}
            name="culture_score"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Cultura (alinhamento com valores da empresa)</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[value]}
                    onValueChange={(vals) => onChange(vals[0])}
                  />
                </FormControl>
                <FormDescription>
                  Avalie o alinhamento do candidato com valores da empresa (0-100)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="performance_score"
            render={({ field: { value, onChange } }) => (
              <FormItem className="mt-4">
                <FormLabel>Performance (capacidade de entrega e resultado)</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[value]}
                    onValueChange={(vals) => onChange(vals[0])}
                  />
                </FormControl>
                <FormDescription>
                  Avalie a capacidade de entrega e resultados do candidato (0-100)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="energy_score"
            render={({ field: { value, onChange } }) => (
              <FormItem className="mt-4">
                <FormLabel>Energia (atitude, resiliência e dinamismo)</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[value]}
                    onValueChange={(vals) => onChange(vals[0])}
                  />
                </FormControl>
                <FormDescription>
                  Avalie a atitude, resiliência e dinamismo do candidato (0-100)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentários</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione observações sobre o candidato..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Opcional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Enviar Avaliação
        </Button>
      </form>
    </Form>
  );
}
