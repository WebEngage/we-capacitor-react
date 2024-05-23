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
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  const [analyticList, setAnalytics] = useState<ListItem[]>([]);
  const [eventList, setEvents] = useState<ListItem[]>([]);

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

  return (
    <IonPage
      id="home-page"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <IonHeader
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <IonToolbar
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonTitle
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            WebEngage Ionic Capacitor
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <IonRefresher
          slot="fixed"
          onIonRefresh={refresh}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonRefresherContent
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          ></IonRefresherContent>
        </IonRefresher>

        <IonHeader
          collapse="condense"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonToolbar
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonTitle
              size="large"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              USER ANALYTICS
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {analyticList.map((m) => (
            <MessageListItem key={m.id} message={m} />
          ))}
        </IonList>

        <IonHeader
          collapse="condense"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonToolbar
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonTitle
              size="large"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              TRACK EVENTS
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {eventList.map((m) => (
            <MessageListItem key={m.id} message={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
