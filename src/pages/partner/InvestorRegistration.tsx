
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useInvestorMutations } from "@/hooks/useInvestors";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const investorSchema = z.object({
  full_name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  birth_date: z.string().optional(),
  profession: z.string().optional(),
  income_range: z.string().optional(),
  investment_experience: z.string().optional(),
  notes: z.string().optional(),
  // Endereço
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipcode: z.string().optional(),
});

type InvestorFormData = z.infer<typeof investorSchema>;

const InvestorRegistration = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { createInvestor } = useInvestorMutations();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InvestorFormData>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      cpf: "",
      birth_date: "",
      profession: "",
      income_range: "",
      investment_experience: "",
      notes: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipcode: "",
    },
  });

  const onSubmit = async (data: InvestorFormData) => {
    if (!userProfile?.id) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Buscar o partner_id baseado no profile_id
      const { data: partnerData, error: partnerError } = await supabase
        .from('partners')
        .select('id')
        .eq('profile_id', userProfile.id)
        .single();

      if (partnerError || !partnerData) {
        throw new Error("Parceiro não encontrado");
      }

      // Preparar dados do endereço
      const address = {
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
      };

      // Criar investidor
      const investorData = {
        profile_id: null, // Será null inicialmente até o investidor fazer login
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        cpf: data.cpf || null,
        address: Object.keys(address).length > 0 ? address : null,
        birth_date: data.birth_date || null,
        profession: data.profession || null,
        income_range: data.income_range || null,
        investment_experience: data.investment_experience || null,
        status: 'lead' as const,
        lead_source: 'partner' as const,
        partner_id: partnerData.id,
        notes: data.notes || null,
        tags: null,
        last_contact_date: new Date().toISOString(),
      };

      await createInvestor.mutateAsync(investorData);
      
      toast({
        title: "Investidor cadastrado",
        description: "Investidor foi cadastrado com sucesso!",
      });
      
      navigate('/partner/investors');
    } catch (error: any) {
      console.error('Error creating investor:', error);
      toast({
        title: "Erro ao cadastrar investidor",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/partner/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="w-px h-6 bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">
              Cadastrar Novo Investidor
            </h1>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Investidor</CardTitle>
              <CardDescription>
                Preencha as informações do investidor que você está indicando
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo *</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome completo" {...field} />
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
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(11) 99999-9999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                              <Input placeholder="000.000.000-00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="birth_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Endereço */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Endereço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rua</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome da rua" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Complemento</FormLabel>
                            <FormControl>
                              <Input placeholder="Apto, bloco, etc" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bairro</FormLabel>
                            <FormControl>
                              <Input placeholder="Bairro" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input placeholder="Cidade" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input placeholder="SP" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input placeholder="00000-000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Informações Profissionais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Informações Profissionais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profissão</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Engenheiro, Médico" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="income_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Faixa de Renda</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a faixa" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="até-5k">Até R$ 5.000</SelectItem>
                                <SelectItem value="5k-10k">R$ 5.000 - R$ 10.000</SelectItem>
                                <SelectItem value="10k-20k">R$ 10.000 - R$ 20.000</SelectItem>
                                <SelectItem value="20k-50k">R$ 20.000 - R$ 50.000</SelectItem>
                                <SelectItem value="acima-50k">Acima de R$ 50.000</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="investment_experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experiência em Investimentos</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o nível" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="iniciante">Iniciante</SelectItem>
                                <SelectItem value="intermediario">Intermediário</SelectItem>
                                <SelectItem value="avancado">Avançado</SelectItem>
                                <SelectItem value="especialista">Especialista</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Observações */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Observações</h3>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notas sobre o investidor</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Informações adicionais, contexto da indicação, interesses específicos..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/partner/dashboard')}
                      disabled={isLoading}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Cadastrando..." : "Cadastrar Investidor"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestorRegistration;
