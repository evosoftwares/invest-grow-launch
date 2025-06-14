
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

interface ChannelAnalysisChartProps {
  data: Array<{
    channel: string;
    percentage: number;
    amount: number;
    count: number;
  }>;
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

const chartConfig = {
  channel: {
    label: "Canal",
  },
};

export const ChannelAnalysisChart = ({ data }: ChannelAnalysisChartProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Análise por Canal
        </CardTitle>
        <CardDescription>
          Distribuição de investimentos por fonte de origem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="percentage"
                    label={({ channel, percentage }) => `${channel}: ${percentage.toFixed(1)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name, props) => [
                          `${Number(value).toFixed(1)}%`,
                          props?.payload?.channel || 'Canal'
                        ]}
                      />
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={item.channel} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium">{item.channel}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.percentage.toFixed(1)}%</p>
                  <p className="text-sm text-gray-500">{formatCurrency(item.amount)}</p>
                  <p className="text-xs text-gray-400">{item.count} investimentos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
