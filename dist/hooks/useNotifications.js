var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
export const useNotifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    // Simular notificações baseadas em atividades recentes
    const { data: activities } = useQuery({
        queryKey: ['recent-activities', user === null || user === void 0 ? void 0 : user.id],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!(user === null || user === void 0 ? void 0 : user.id))
                return [];
            const { data, error } = yield supabase
                .from('activities')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10);
            if (error) {
                console.error('Error fetching activities:', error);
                return [];
            }
            return data || [];
        }),
        enabled: !!(user === null || user === void 0 ? void 0 : user.id),
    });
    // Converter atividades em notificações
    useEffect(() => {
        if (activities) {
            const newNotifications = activities.map((activity, index) => ({
                id: activity.id,
                title: getNotificationTitle(activity.action, activity.entity_type),
                message: activity.description || `Ação realizada: ${activity.action}`,
                type: getNotificationType(activity.action),
                read: false,
                created_at: activity.created_at,
                entity_type: activity.entity_type,
                entity_id: activity.entity_id,
            }));
            setNotifications(newNotifications);
        }
    }, [activities]);
    const getNotificationTitle = (action, entityType) => {
        const actionMap = {
            'create': 'Novo item criado',
            'update': 'Item atualizado',
            'delete': 'Item removido',
            'approve': 'Item aprovado',
            'reject': 'Item rejeitado',
        };
        const entityMap = {
            'investment': 'investimento',
            'investor': 'investidor',
            'partner': 'parceiro',
            'commission': 'comissão',
        };
        return `${actionMap[action] || 'Ação realizada'} - ${entityMap[entityType] || entityType}`;
    };
    const getNotificationType = (action) => {
        switch (action) {
            case 'create':
            case 'approve':
                return 'success';
            case 'reject':
            case 'delete':
                return 'warning';
            case 'error':
                return 'error';
            default:
                return 'info';
        }
    };
    const markAsRead = (notificationId) => {
        setNotifications(prev => prev.map(notif => notif.id === notificationId
            ? Object.assign(Object.assign({}, notif), { read: true }) : notif));
    };
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(notif => (Object.assign(Object.assign({}, notif), { read: true }))));
    };
    const unreadCount = notifications.filter(n => !n.read).length;
    return {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
    };
};
