import MessageListItem from '../components/MessageListItem';
import { useState } from 'react';
import { ListItem, getAnalytics, getEvents } from '../data/listItem';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';

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
            <IonTitle size="large">
            USER ANALYTICS
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {analyticList.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
            TRACK EVENTS
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {eventList.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
