
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
  entity_type?: string;
  entity_id?: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simular notificações baseadas em atividades recentes
  const { data: activities } = useQuery({
    queryKey: ['recent-activities', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
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
    },
    enabled: !!user?.id,
  });

  // Converter atividades em notificações
  useEffect(() => {
    if (activities) {
      const newNotifications: Notification[] = activities.map((activity, index) => ({
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

  const getNotificationTitle = (action: string, entityType: string) => {
    const actionMap: { [key: string]: string } = {
      'create': 'Novo item criado',
      'update': 'Item atualizado',
      'delete': 'Item removido',
      'approve': 'Item aprovado',
      'reject': 'Item rejeitado',
    };

    const entityMap: { [key: string]: string } = {
      'investment': 'investimento',
      'investor': 'investidor',
      'partner': 'parceiro',
      'commission': 'comissão',
    };

    return `${actionMap[action] || 'Ação realizada'} - ${entityMap[entityType] || entityType}`;
  };

  const getNotificationType = (action: string): 'info' | 'success' | 'warning' | 'error' => {
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

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
};
