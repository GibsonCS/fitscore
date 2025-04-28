
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos").optional(),
  position: z.string().min(2, "Cargo deve ter pelo menos 2 caracteres"),
  experience: z.string().min(10, "Por favor, descreva sua experiência com pelo menos 10 caracteres"),
  skills: z.string().min(5, "Por favor, liste suas habilidades"),
  personalAttributes: z.string().min(10, "Por favor, descreva seus atributos pessoais com pelo menos 10 caracteres"),
});

interface CandidateFormProps {
  onSubmitSuccess?: (data: z.infer<typeof formSchema>) => void;
}

export function CandidateForm({ onSubmitSuccess }: CandidateFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      skills: "",
      personalAttributes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      
      if (onSubmitSuccess) {
        await onSubmitSuccess(values);
      } else {
        // Fallback to original behavior if no callback provided
        toast.success("Candidato cadastrado com sucesso!");
      }
    } catch (error: any) {
      toast.error(error.message || "Ocorreu um erro ao enviar o formulário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="João Silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="joao@exemplo.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="(11) 98765-4321" {...field} />
              </FormControl>
              <FormDescription>
                Opcional
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo Pretendido</FormLabel>
              <FormControl>
                <Input placeholder="Desenvolvedor Frontend" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experiência Profissional</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva brevemente sua experiência profissional, incluindo empresas anteriores e principais responsabilidades." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habilidades</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Liste suas principais habilidades técnicas e comportamentais (ex: React, Node.js, trabalho em equipe, comunicação)."
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalAttributes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Atributos Pessoais</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva seus atributos pessoais, como cultura (alinhamento com valores da empresa), performance (capacidade de entrega e resultado) e energia (atitude, resiliência e dinamismo)."
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Com base em sua resposta, nosso sistema utilizará inteligência artificial para gerar um FitScore de 0 a 100, auxiliando no processo de avaliação.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Candidatura"}
        </Button>
      </form>
    </Form>
  );
}
