import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const getNotificationIcon = (type) => {
        const iconClass = "w-2 h-2 rounded-full";
        switch (type) {
            case 'success':
                return _jsx("div", { className: `${iconClass} bg-green-500` });
            case 'warning':
                return _jsx("div", { className: `${iconClass} bg-yellow-500` });
            case 'error':
                return _jsx("div", { className: `${iconClass} bg-red-500` });
            default:
                return _jsx("div", { className: `${iconClass} bg-blue-500` });
        }
    };
    const formatTime = (dateString) => {
        try {
            return formatDistanceToNow(new Date(dateString), {
                addSuffix: true,
                locale: ptBR
            });
        }
        catch (_a) {
            return 'Agora mesmo';
        }
    };
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "relative", children: [_jsx(Bell, { className: "w-5 h-5" }), unreadCount > 0 && (_jsx(Badge, { variant: "destructive", className: "absolute -top-1 -right-1 text-xs min-w-5 h-5 flex items-center justify-center p-0", children: unreadCount > 99 ? '99+' : unreadCount }))] }) }), _jsxs(PopoverContent, { className: "w-80 p-0", align: "end", children: [_jsx("div", { className: "p-4 border-b", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold text-sm", children: "Notifica\u00E7\u00F5es" }), unreadCount > 0 && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: markAllAsRead, className: "text-xs h-auto p-1", children: [_jsx(CheckCheck, { className: "w-3 h-3 mr-1" }), "Marcar todas como lidas"] }))] }) }), _jsx(ScrollArea, { className: "h-80", children: notifications.length === 0 ? (_jsx("div", { className: "p-4 text-center text-gray-500 text-sm", children: "Nenhuma notifica\u00E7\u00E3o" })) : (_jsx("div", { className: "p-2", children: notifications.map((notification, index) => (_jsxs("div", { children: [_jsx("div", { className: `p-3 rounded-lg cursor-pointer transition-colors ${notification.read
                                            ? 'hover:bg-gray-50'
                                            : 'bg-blue-50 hover:bg-blue-100'}`, onClick: () => markAsRead(notification.id), children: _jsxs("div", { className: "flex items-start gap-3", children: [getNotificationIcon(notification.type), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 truncate", children: notification.title }), !notification.read && (_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                                                        e.stopPropagation();
                                                                        markAsRead(notification.id);
                                                                    }, className: "h-auto p-1 ml-1", children: _jsx(Check, { className: "w-3 h-3" }) }))] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: notification.message }), _jsx("p", { className: "text-xs text-gray-400 mt-1", children: formatTime(notification.created_at) })] })] }) }), index < notifications.length - 1 && _jsx(Separator, { className: "my-1" })] }, notification.id))) })) })] })] }));
};
