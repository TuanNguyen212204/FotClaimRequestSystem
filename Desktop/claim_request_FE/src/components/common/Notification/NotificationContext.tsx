import React, {createContext, useContext, useState, ReactNode} from 'react';
import Notification from '@components/common/Notification/Notification';

interface Notification {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

interface NotificationContextType{
    show: (config: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);  

export const NotificationProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);    

    const show = (config: Notification) => {
        setNotifications((prev)=>[...prev,{...config,duration: config.duration || 5000}]);
        setTimeout(()=>{
            setNotifications((prev) => prev.filter((_,i)=> i !== 0));
        },config.duration || 5000);    
    };

    return (
        <NotificationContext.Provider value={{show}}>
        {children}
        {notifications.map((notif, index) => (
        <Notification 
            key={index} 
            message={notif.message}
            type ={notif.type}
            duration={notif.duration}
            onClose={() => setNotifications((prev) => prev.filter((_, i) => i !== index))}></Notification>
        ))}
        </NotificationContext.Provider> 
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if(!context){
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}