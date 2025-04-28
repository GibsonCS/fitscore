
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
