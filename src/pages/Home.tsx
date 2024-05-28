import MessageListItem from "../components/MessageListItem";
import { useState } from "react";
import { ListItem, getAnalytics, getEvents } from "../data/listItem";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonToggle,
  IonLabel,
  IonItem,
} from "@ionic/react";
import "./Home.css";
import { Webengage, WebengageUser } from "@awesome-cordova-plugins/webengage";

type NotificationType =
  | "push"
  | "sms"
  | "email"
  | "in_app"
  | "whatsapp"
  | "viber";

const Home: React.FC = () => {
  const [analyticList, setAnalytics] = useState<ListItem[]>([]);
  const [eventList, setEvents] = useState<ListItem[]>([]);

  const [userOptInList, setUserOptInList] = useState<
    Record<NotificationType, boolean>
  >({
    push: true,
    sms: true,
    email: true,
    in_app: true,
    whatsapp: true,
    viber: true,
  });

  useIonViewWillEnter(() => {
    const anltcs = getAnalytics();
    const events = getEvents();
    setAnalytics(anltcs);
    setEvents(events);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const handleNotificationChange = (e: any, type: NotificationType) => {
    WebengageUser.setUserOptIn(type, e.detail.checked);
    setUserOptInList({
      ...userOptInList,
      [type]: e.detail.checked,
    });
  };

  const startGAIDTracking = () => {
    Webengage.startGAIDTracking();
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>WebEngage Ionic Capacitor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">USER ANALYTICS</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {analyticList.map((m) => (
            <MessageListItem key={m.id} message={m} />
          ))}
        </IonList>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">TRACK EVENTS</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {eventList.map((m) => (
            <MessageListItem key={m.id} message={m} />
          ))}
        </IonList>

        <IonItem button onClick={startGAIDTracking}>
          <div slot="start" className="dot"></div>
          <IonLabel className="ion-text-wrap">
            <h2>Start GAID Tracking</h2>
          </IonLabel>
        </IonItem>

        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">User OptIn List</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonTitle size="large"></IonTitle>
          {Object.keys(userOptInList).map((type) => (
            <IonItem key={type}>
              <IonLabel>{type}</IonLabel>
              <IonToggle
                checked={userOptInList[type as NotificationType]}
                onIonChange={(e) =>
                  handleNotificationChange(e, type as NotificationType)
                }
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
