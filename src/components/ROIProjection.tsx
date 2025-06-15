
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar } from "lucide-react";

interface ROIProjectionProps {
  data: Array<{
    year: number;
    balance: number;
    contributed: number;
    interest: number;
  }>;
}

export const ROIProjection = ({ data }: ROIProjectionProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const calculateYearlyGrowth = (currentBalance: number, previousBalance: number) => {
    if (previousBalance === 0) return 0;
    return ((currentBalance - previousBalance) / previousBalance) * 100;
  };

  const calculateYearlyROI = (currentInterest: number, currentContributed: number) => {
    if (currentContributed === 0) return 0;
    return (currentInterest / currentContributed) * 100;
  };

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="w-5 h-5 text-amber-600" />
          Projeção Detalhada
        </CardTitle>
        <CardDescription>
          Acompanhe a evolução ano a ano do seu investimento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-amber-50 to-orange-50">
                <TableHead className="font-semibold">Ano</TableHead>
                <TableHead className="font-semibold">Total Investido</TableHead>
                <TableHead className="font-semibold">Lucro Acumulado</TableHead>
                <TableHead className="font-semibold">Saldo Total</TableHead>
                <TableHead className="font-semibold">ROI (%)</TableHead>
                <TableHead className="font-semibold">Crescimento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => {
                const previousBalance = index > 0 ? data[index - 1].balance : row.balance;
                const growth = calculateYearlyGrowth(row.balance, previousBalance);
                const roi = calculateYearlyROI(row.interest, row.contributed);
                
                return (
                  <TableRow 
                    key={row.year} 
                    className="hover:bg-gradient-to-r hover:from-amber-25 hover:to-orange-25 transition-all duration-200"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {row.year}
                        </div>
                        {row.year === 0 ? "Inicial" : `${row.year} ano${row.year > 1 ? 's' : ''}`}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-blue-600">
                      {formatCurrency(row.contributed)}
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {formatCurrency(row.interest)}
                    </TableCell>
                    <TableCell className="font-bold text-purple-600 text-lg">
                      {formatCurrency(row.balance)}
                    </TableCell>
                    <TableCell>
                      {row.year > 0 && (
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                          {roi.toFixed(1)}%
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {row.year > 0 && (
                        <Badge 
                          className={`${
                            growth > 0 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                              : 'bg-gradient-to-r from-red-500 to-rose-500'
                          } text-white`}
                        >
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        {data.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h4 className="font-semibold text-amber-800">Resumo Final</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-amber-700">Valor Final:</span>
                <p className="font-bold text-lg text-amber-800">
                  {formatCurrency(data[data.length - 1].balance)}
                </p>
              </div>
              <div>
                <span className="text-amber-700">Total Investido:</span>
                <p className="font-bold text-lg text-amber-800">
                  {formatCurrency(data[data.length - 1].contributed)}
                </p>
              </div>
              <div>
                <span className="text-amber-700">Lucro Total:</span>
                <p className="font-bold text-lg text-amber-800">
                  {formatCurrency(data[data.length - 1].interest)}
                </p>
              </div>
              <div>
                <span className="text-amber-700">ROI Total:</span>
                <p className="font-bold text-lg text-amber-800">
                  {calculateYearlyROI(data[data.length - 1].interest, data[data.length - 1].contributed).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
