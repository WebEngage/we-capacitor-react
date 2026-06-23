import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonList,
  IonButtons,
} from '@ionic/react';
import { NotificationResponse, WECapInbox } from '@awesome-cordova-plugins/we-cap-inbox';

const NotificationInbox: React.FC = () => {
  const [notificationList, setNotificationList] = useState<any[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    getNotificationList(null);
  }, []);

  const getNotificationList = (lastNotification?: any) => {
    WECapInbox.getNotificationList(
      lastNotification,
      function (response: NotificationResponse) {
        setNotificationList((prevList) => [...prevList, ...response.messageList]);
        setHasNext(response.hasNext);
        console.log('WebEngage: Success! notification List - ', JSON.stringify(response));
      },
      (err: any) => {
        console.log('WebEngage: Error! notification List', err);
      }
    );
  };

  const fetchMoreNotifications = () => {
    if (notificationList.length > 0) {
      const lastNotification = notificationList[notificationList.length - 1];
      getNotificationList(lastNotification);
    }
  };

  const markAsRead = (index: number) => {
    WECapInbox.markRead(notificationList[index]);
    const updatedNotificationList = [...notificationList];
    updatedNotificationList[index].status = 'READ';
    setNotificationList(updatedNotificationList);
  };

  const markAsUnread = (index: number) => {
    WECapInbox.markUnread(notificationList[index]);
    const updatedNotificationList = [...notificationList];
    updatedNotificationList[index].status = 'UNREAD';
    setNotificationList(updatedNotificationList);
  };

  const markAsDeleted = (index: number) => {
    WECapInbox.markDelete(notificationList[index]);
    const updatedNotificationList = [...notificationList];
    updatedNotificationList.splice(index, 1);
    setNotificationList(updatedNotificationList);
  };

  const trackAsClick = (index: number) => {
    WECapInbox.trackClick(notificationList[index]);
  };

  const trackAsView = (index: number) => {
    WECapInbox.trackView(notificationList[index]);
  };

  const markAllAsRead = () => {
    WECapInbox.readAll(notificationList);
    const updatedNotificationList = notificationList.map((notification) => ({
      ...notification,
      status: 'READ',
    }));
    setNotificationList(updatedNotificationList);
  };

  const markAllAsUnread = () => {
    WECapInbox.unReadAll(notificationList);
    const updatedNotificationList = notificationList.map((notification) => ({
      ...notification,
      status: 'UNREAD',
    }));
    setNotificationList(updatedNotificationList);
  };

  const deleteAll = () => {
    WECapInbox.deleteAll(notificationList);
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
          <IonButton color="primary" onClick={markAllAsRead}>
            Read All
          </IonButton>
          <IonButton color="secondary" onClick={markAllAsUnread}>
            Unread All
          </IonButton>
          <IonButton color="danger" onClick={deleteAll}>
            Delete All
          </IonButton>
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
                <IonButton color="primary" onClick={() => markAsRead(index)}>
                  Mark Read
                </IonButton>
                <IonButton color="secondary" onClick={() => markAsUnread(index)}>
                  Mark Unread
                </IonButton>
                <IonButton color="danger" onClick={() => markAsDeleted(index)}>
                  Delete
                </IonButton>
                <IonButton color="danger" onClick={() => trackAsClick(index)}>
                  Track Click
                </IonButton>
                <IonButton color="danger" onClick={() => trackAsView(index)}>
                  Track View
                </IonButton>
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
