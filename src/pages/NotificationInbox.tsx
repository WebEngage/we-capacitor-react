import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonList, IonButtons } from '@ionic/react';
import { WECapInbox } from '@awesome-cordova-plugins/we-cap-inbox';

const NotificationInbox: React.FC = () => {
    const [notificationList, setNotificationList] = useState<any[]>([]);
    const [hasNext, setHasNext] = useState<boolean>(false);

    useEffect(() => {
        getNotificationList(null);
    }, []);

    const getNotificationList = (lastNotification?: any) => {
        WECapInbox.getNotificationList(lastNotification, (response: any) => {
            setNotificationList(prevList => [...prevList, ...response.messageList]);
            setHasNext(response.hasNext);
            console.log("WebEngage: Success! notification List - ", response);
        }, (err: any) => {
            console.log("WebEngage: Error! notification List", err);
        });
    };

    const fetchMoreNotifications = () => {
        if (notificationList.length > 0) {
            const lastNotification = notificationList[notificationList.length - 1];
            getNotificationList(lastNotification);
        }
    };

    const markAsRead = (index: number) => {

        // Call the plugin's markRead method
        WECapInbox.markRead(notificationList[index]);

        // Mark the notification as read
        const updatedNotificationList = [...notificationList];
        updatedNotificationList[index].status = 'READ';

        // Update state
        setNotificationList(updatedNotificationList);
    };

    const markAsUnread = (index: number) => {

        // Call the plugin's markUnread method
        WECapInbox.markUnread(notificationList[index]);

        // Mark the notification as unread
        const updatedNotificationList = [...notificationList];
        updatedNotificationList[index].status = 'UNREAD';

        // Update state
        setNotificationList(updatedNotificationList);

    };

    const markAsDeleted = (index: number) => {

        // Call the plugin's markDelete method
        WECapInbox.markDelete(notificationList[index]);

        // Remove the notification from the list
        const updatedNotificationList = [...notificationList];
        updatedNotificationList.splice(index, 1);

        // Update state
        setNotificationList(updatedNotificationList);
    };

    const markAllAsRead = () => {

        // Call the plugin's readAll method
        WECapInbox.readAll(notificationList);

        // Mark all notifications as read
        const updatedNotificationList = notificationList.map(notification => ({
            ...notification,
            status: 'READ'
        }));
        // Update state
        setNotificationList(updatedNotificationList);
    };

    const markAllAsUnread = () => {

        // Call the plugin's unReadAll method
        WECapInbox.unReadAll(notificationList);

        // Mark all notifications as unread
        const updatedNotificationList = notificationList.map(notification => ({
            ...notification,
            status: 'UNREAD'
        }));
        // Update state
        setNotificationList(updatedNotificationList);

    };

    const deleteAll = () => {

        // Call the plugin's deleteAll method (commented out as per the original code)
        WECapInbox.deleteAll(notificationList);
        
        // Delete all notifications
        setNotificationList([]);

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Notification Inbox</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* Action buttons on top of the list */}
                <IonButtons className="ion-padding">
                    <IonButton color="primary" onClick={markAllAsRead}>Read All</IonButton>
                    <IonButton color="secondary" onClick={markAllAsUnread}>Unread All</IonButton>
                    <IonButton color="danger" onClick={deleteAll}>Delete All</IonButton>
                </IonButtons>

                {/* Notification List */}
                <IonList>
                    {notificationList.map((notification, index) => (
                        <IonItem key={index}>
                            <IonLabel>
                                <h2>{notification.message.title}</h2>
                                <p>{notification.message.message}</p>
                            </IonLabel>
                            <IonButtons>
                                <IonButton color="primary" onClick={() => markAsRead(index)}>Mark Read</IonButton>
                                <IonButton color="secondary" onClick={() => markAsUnread(index)}>Mark Unread</IonButton>
                                <IonButton color="danger" onClick={() => markAsDeleted(index)}>Delete</IonButton>
                            </IonButtons>
                        </IonItem>
                    ))}
                </IonList>

                {/* Fetch More Button */}
                {hasNext && (
                    <IonButton expand="block" onClick={fetchMoreNotifications}>
                        Fetch More
                    </IonButton>
                )}
            </IonContent>
        </IonPage>
    );
};

export default NotificationInbox;
