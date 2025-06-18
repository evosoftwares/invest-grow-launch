import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
export const ROICalculator = () => {
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            initialInvestment: 10000,
            monthlyContribution: 1000,
            annualReturn: 12,
            investmentPeriod: 5
        }
    });
    const watchedValues = watch();
    const calculateROI = (data) => {
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
    const onSubmit = (data) => {
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
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };
    const formatCurrencyCompact = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-8", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4", children: _jsx(Calculator, { className: "w-8 h-8 text-white" }) }), _jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent", children: "Calculadora de ROI" }), _jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Descubra o potencial de crescimento do seu investimento com nossa calculadora avan\u00E7ada" })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [_jsxs(Card, { className: "shadow-xl border-0 bg-gradient-to-br from-white to-blue-50", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-2xl", children: [_jsx(DollarSign, { className: "w-6 h-6 text-blue-600" }), "Par\u00E2metros do Investimento"] }), _jsx(CardDescription, { children: "Configure os valores para calcular seu retorno" })] }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "initialInvestment", className: "text-sm font-medium flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-4 h-4" }), "Investimento Inicial"] }), _jsx(Input, Object.assign({ id: "initialInvestment", type: "number", min: "100", max: "10000000", step: "100" }, register("initialInvestment", {
                                                    required: true,
                                                    min: 100,
                                                    max: 10000000,
                                                    valueAsNumber: true
                                                }), { className: "text-lg font-semibold" })), _jsxs("p", { className: "text-sm text-gray-500", children: ["Valor atual: ", formatCurrency(watchedValues.initialInvestment || 0)] }), errors.initialInvestment && (_jsx("p", { className: "text-sm text-red-500", children: "Valor deve estar entre R$ 100 e R$ 10.000.000" }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "monthlyContribution", className: "text-sm font-medium flex items-center gap-2", children: [_jsx(Calendar, { className: "w-4 h-4" }), "Aporte Mensal"] }), _jsx(Input, Object.assign({ id: "monthlyContribution", type: "number", min: "0", max: "1000000", step: "50" }, register("monthlyContribution", {
                                                    required: true,
                                                    min: 0,
                                                    max: 1000000,
                                                    valueAsNumber: true
                                                }), { className: "text-lg font-semibold" })), _jsxs("p", { className: "text-sm text-gray-500", children: ["Valor atual: ", formatCurrency(watchedValues.monthlyContribution || 0)] }), errors.monthlyContribution && (_jsx("p", { className: "text-sm text-red-500", children: "Valor deve estar entre R$ 0 e R$ 1.000.000" }))] }), _jsxs("div", { className: "space-y-4", children: [_jsxs(Label, { className: "text-sm font-medium", children: ["Taxa de Retorno Anual: ", watchedValues.annualReturn, "%"] }), _jsx(Slider, { value: [watchedValues.annualReturn], onValueChange: (value) => setValue("annualReturn", value[0]), max: 30, min: 0.1, step: 0.1, className: "w-full" }), _jsxs("div", { className: "flex justify-between text-xs text-gray-500", children: [_jsx("span", { children: "0,1%" }), _jsx("span", { children: "15%" }), _jsx("span", { children: "30%" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs(Label, { className: "text-sm font-medium", children: ["Per\u00EDodo de Investimento: ", watchedValues.investmentPeriod, " anos"] }), _jsx(Slider, { value: [watchedValues.investmentPeriod], onValueChange: (value) => setValue("investmentPeriod", value[0]), max: 30, min: 1, step: 1, className: "w-full" }), _jsxs("div", { className: "flex justify-between text-xs text-gray-500", children: [_jsx("span", { children: "1 ano" }), _jsx("span", { children: "15 anos" }), _jsx("span", { children: "30 anos" })] })] }), _jsxs(Button, { type: "submit", className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300", children: ["Calcular ROI", _jsx(ArrowRight, { className: "ml-2 w-5 h-5" })] })] }) })] }), _jsxs("div", { className: "space-y-6", children: [showResults && results && (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "shadow-xl border-0 bg-gradient-to-br from-green-50 to-blue-50", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-2xl text-green-700", children: "Resultado da Simula\u00E7\u00E3o" }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center p-4 bg-white rounded-lg shadow-sm", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Valor Final" }), _jsx("p", { className: "text-2xl font-bold text-green-600", children: formatCurrency(results.finalBalance) })] }), _jsxs("div", { className: "text-center p-4 bg-white rounded-lg shadow-sm", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total Investido" }), _jsx("p", { className: "text-2xl font-bold text-blue-600", children: formatCurrency(results.totalContributed) })] }), _jsxs("div", { className: "text-center p-4 bg-white rounded-lg shadow-sm", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Lucro Total" }), _jsx("p", { className: "text-2xl font-bold text-purple-600", children: formatCurrency(results.totalInterest) })] }), _jsxs("div", { className: "text-center p-4 bg-white rounded-lg shadow-sm", children: [_jsx("p", { className: "text-sm text-gray-600", children: "ROI Total" }), _jsxs(Badge, { className: "text-lg px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500", children: [results.roi.toFixed(1), "%"] })] })] }) })] }), _jsx(ROIChart, { data: results.projectionData }), _jsx(ROIProjection, { data: results.projectionData })] })), !showResults && (_jsx(Card, { className: "shadow-xl border-0 bg-gradient-to-br from-gray-50 to-blue-50", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx("div", { className: "w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Calculator, { className: "w-12 h-12 text-blue-500" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-700 mb-2", children: "Configure seus par\u00E2metros" }), _jsx("p", { className: "text-gray-500", children: "Preencha os dados ao lado e clique em \"Calcular ROI\" para ver os resultados" })] }) }))] })] })] }));
};
