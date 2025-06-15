
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, DollarSign, Calendar, ArrowRight } from "lucide-react";
import { ROIChart } from "./ROIChart";
import { ROIProjection } from "./ROIProjection";

interface FormData {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;
  investmentPeriod: number;
}

export const ROICalculator = () => {
  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      initialInvestment: 10000,
      monthlyContribution: 1000,
      annualReturn: 12,
      investmentPeriod: 5
    }
  });

  const watchedValues = watch();

  const calculateROI = (data: FormData) => {
    const { initialInvestment, monthlyContribution, annualReturn, investmentPeriod } = data;
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    let balance = initialInvestment;
    const projectionData = [];
    let totalContributed = initialInvestment;
    
    // Add initial data point
    projectionData.push({
      year: 0,
      balance: Math.round(balance),
      contributed: Math.round(totalContributed),
      interest: 0
    });
    
    for (let month = 1; month <= totalMonths; month++) {
      // Apply compound interest to current balance first
      balance = balance * (1 + monthlyRate);
      
      // Then add monthly contribution
      balance = balance + monthlyContribution;
      totalContributed += monthlyContribution;
      
      // Store yearly data points
      if (month % 12 === 0) {
        const interest = balance - totalContributed;
        projectionData.push({
          year: month / 12,
          balance: Math.round(balance),
          contributed: Math.round(totalContributed),
          interest: Math.round(interest)
        });
      }
    }
    
    const finalBalance = balance;
    const totalInterest = finalBalance - totalContributed;
    const roi = (totalInterest / totalContributed) * 100;
    
    return {
      finalBalance,
      totalContributed,
      totalInterest,
      roi,
      projectionData
    };
  };

  const onSubmit = (data: FormData) => {
    // Validate input values
    if (data.initialInvestment < 100) {
      alert("O investimento inicial deve ser pelo menos R$ 100");
      return;
    }
    if (data.monthlyContribution < 0) {
      alert("O aporte mensal não pode ser negativo");
      return;
    }
    if (data.annualReturn <= 0 || data.annualReturn > 50) {
      alert("A taxa de retorno deve estar entre 0,1% e 50%");
      return;
    }
    if (data.investmentPeriod < 1 || data.investmentPeriod > 50) {
      alert("O período de investimento deve estar entre 1 e 50 anos");
      return;
    }

    const calculatedResults = calculateROI(data);
    setResults(calculatedResults);
    setShowResults(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatCurrencyCompact = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Calculadora de ROI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubra o potencial de crescimento do seu investimento com nossa calculadora avançada
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <DollarSign className="w-6 h-6 text-blue-600" />
              Parâmetros do Investimento
            </CardTitle>
            <CardDescription>
              Configure os valores para calcular seu retorno
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Initial Investment */}
              <div className="space-y-2">
                <Label htmlFor="initialInvestment" className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Investimento Inicial
                </Label>
                <Input
                  id="initialInvestment"
                  type="number"
                  min="100"
                  max="10000000"
                  step="100"
                  {...register("initialInvestment", { 
                    required: true, 
                    min: 100, 
                    max: 10000000,
                    valueAsNumber: true 
                  })}
                  className="text-lg font-semibold"
                />
                <p className="text-sm text-gray-500">
                  Valor atual: {formatCurrency(watchedValues.initialInvestment || 0)}
                </p>
                {errors.initialInvestment && (
                  <p className="text-sm text-red-500">
                    Valor deve estar entre R$ 100 e R$ 10.000.000
                  </p>
                )}
              </div>

              {/* Monthly Contribution */}
              <div className="space-y-2">
                <Label htmlFor="monthlyContribution" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Aporte Mensal
                </Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  min="0"
                  max="1000000"
                  step="50"
                  {...register("monthlyContribution", { 
                    required: true, 
                    min: 0, 
                    max: 1000000,
                    valueAsNumber: true 
                  })}
                  className="text-lg font-semibold"
                />
                <p className="text-sm text-gray-500">
                  Valor atual: {formatCurrency(watchedValues.monthlyContribution || 0)}
                </p>
                {errors.monthlyContribution && (
                  <p className="text-sm text-red-500">
                    Valor deve estar entre R$ 0 e R$ 1.000.000
                  </p>
                )}
              </div>

              {/* Annual Return Slider */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">
                  Taxa de Retorno Anual: {watchedValues.annualReturn}%
                </Label>
                <Slider
                  value={[watchedValues.annualReturn]}
                  onValueChange={(value) => setValue("annualReturn", value[0])}
                  max={30}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0,1%</span>
                  <span>15%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Investment Period Slider */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">
                  Período de Investimento: {watchedValues.investmentPeriod} anos
                </Label>
                <Slider
                  value={[watchedValues.investmentPeriod]}
                  onValueChange={(value) => setValue("investmentPeriod", value[0])}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 ano</span>
                  <span>15 anos</span>
                  <span>30 anos</span>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Calcular ROI
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <div className="space-y-6">
          {showResults && results && (
            <>
              {/* Results Summary */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700">
                    Resultado da Simulação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600">Valor Final</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(results.finalBalance)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600">Total Investido</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(results.totalContributed)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600">Lucro Total</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {formatCurrency(results.totalInterest)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600">ROI Total</p>
                      <Badge className="text-lg px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500">
                        {results.roi.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              <ROIChart data={results.projectionData} />
              
              {/* Projection Table */}
              <ROIProjection data={results.projectionData} />
            </>
          )}
          
          {!showResults && (
            <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-50 to-blue-50">
              <CardContent className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Configure seus parâmetros
                </h3>
                <p className="text-gray-500">
                  Preencha os dados ao lado e clique em "Calcular ROI" para ver os resultados
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
