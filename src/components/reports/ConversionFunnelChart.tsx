
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

interface ConversionFunnelChartProps {
  data: {
    visitors: number;
    leads: number;
    interested: number;
    proposals: number;
    investors: number;
  };
}

export const ConversionFunnelChart = ({ data }: ConversionFunnelChartProps) => {
  const stages = [
    { label: 'Visitantes', value: data.visitors, color: 'bg-blue-500' },
    { label: 'Leads', value: data.leads, color: 'bg-green-500' },
    { label: 'Interessados', value: data.interested, color: 'bg-yellow-500' },
    { label: 'Propostas', value: data.proposals, color: 'bg-purple-500' },
    { label: 'Investidores', value: data.investors, color: 'bg-red-500' },
  ];

  const calculateConversionRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current / previous) * 100).toFixed(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Funil de Conversão
        </CardTitle>
        <CardDescription>
          Acompanhe a jornada dos visitantes até se tornarem investidores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage, index) => {
            const previousValue = index > 0 ? stages[index - 1].value : stage.value;
            const conversionRate = index > 0 ? calculateConversionRate(stage.value, previousValue) : '100.0';
            
            return (
              <div key={stage.label} className="text-center p-4 bg-gray-50 rounded-lg relative">
                <div className={`text-2xl font-bold text-white p-3 rounded-full ${stage.color} inline-block mb-2`}>
                  {stage.value.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm font-medium text-gray-700">{stage.label}</div>
                <div className="text-xs text-gray-500 mt-1">{conversionRate}%</div>
                
                {index < stages.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <div className="w-4 h-4 bg-gray-300 rotate-45 transform"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">Análise de Performance</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-purple-700">Taxa Global:</span>
              <p className="font-bold text-purple-800">
                {calculateConversionRate(data.investors, data.visitors)}%
              </p>
            </div>
            <div>
              <span className="text-purple-700">Lead → Investidor:</span>
              <p className="font-bold text-purple-800">
                {calculateConversionRate(data.investors, data.leads)}%
              </p>
            </div>
            <div>
              <span className="text-purple-700">Proposta → Fechamento:</span>
              <p className="font-bold text-purple-800">
                {calculateConversionRate(data.investors, data.proposals)}%
              </p>
            </div>
            <div>
              <span className="text-purple-700">Total Convertido:</span>
              <p className="font-bold text-purple-800">
                {data.investors.toLocaleString('pt-BR')} investidores
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
