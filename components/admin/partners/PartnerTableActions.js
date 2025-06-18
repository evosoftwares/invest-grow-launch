import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Mail } from "lucide-react";
export const PartnerTableActions = ({ partner, onStatusChange, isLoading }) => {
    return (_jsxs("div", { className: "flex space-x-2", children: [partner.status === 'pending' && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => onStatusChange(partner.id, 'active'), disabled: isLoading, children: _jsx(Check, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => onStatusChange(partner.id, 'blocked'), disabled: isLoading, children: _jsx(X, { className: "w-4 h-4" }) })] })), _jsx(Button, { variant: "outline", size: "sm", children: _jsx(Eye, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "outline", size: "sm", children: _jsx(Mail, { className: "w-4 h-4" }) })] }));
};
