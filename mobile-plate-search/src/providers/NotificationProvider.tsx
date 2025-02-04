import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/lib/notification';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabase';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


interface NotificationContextType {
    sendPushNotification: (title: string, body: string) => void;
    addPushNotificationToUser: (user_id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>({
    sendPushNotification: () => { },
    addPushNotificationToUser: () => { },
});



export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();
    const { profile } = useAuth()

    const updateUserPushNotification = async (user_id: string, token: string | undefined) => {

        console.log("USER / TOKEN")
        console.log(user_id + " / " + token)

        const { data, error } = await supabase
            .from('profiles')
            .update({ push_token: token })
            .eq('id', user_id)
            .eq('push_token', null);

        if (error) {
            console.error('Güncelleme hatası:', error);
        } else {
            console.log('Push token güncellendi.');
        }
    }

    const addPushNotificationToUser = async (user_id: string) => {
        registerForPushNotificationsAsync()
            .then(token => {
                const { profile } = useAuth()
                if (!profile) return
                updateUserPushNotification(user_id, token)
                setExpoPushToken(token ?? '')
            })
            .catch((error: any) => setExpoPushToken(`${error}`));
    }

    async function sendPushNotification(title: string, body: string) {

        const expoPushToken: string = profile?.push_token ?? ''

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: title,
            body: body,
            data: { someData: 'SOME DATA' },
        };
    
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }


    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ addPushNotificationToUser, sendPushNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};


export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};