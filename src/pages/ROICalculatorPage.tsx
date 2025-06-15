
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROICalculator } from "@/components/ROICalculator";
import { ROIChart } from "@/components/ROIChart";
import { ROIProjection } from "@/components/ROIProjection";

const ROICalculatorPage = () => {
  const navigate = useNavigate();
  const [calculationData, setCalculationData] = useState(null);

  const handleCalculationComplete = (data: any) => {
    setCalculationData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Logo */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
                alt="Futuro PDV" 
                className="h-10 w-auto cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Site
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Calculadora ROI
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Simule diferentes cenários de investimento e visualize o potencial de crescimento do seu dinheiro.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Parâmetros de Investimento</CardTitle>
            </CardHeader>
            <CardContent>
              <ROICalculator onCalculationComplete={handleCalculationComplete} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            {calculationData && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Gráfico de Crescimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ROIChart data={calculationData} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Projeção Detalhada</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ROIProjection data={calculationData} />
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculatorPage;
