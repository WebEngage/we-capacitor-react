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
  useIonViewWillEnter,
  IonToggle,
  IonLabel,
  IonItem,
  IonButton,
} from '@ionic/react';
import './Home.css';
import { Webengage, WebengageUser } from '@awesome-cordova-plugins/webengage';
import { WECapInbox } from '@awesome-cordova-plugins/we-cap-inbox';
import { useHistory } from 'react-router';

type NotificationType =
  | 'push'
  | 'sms'
  | 'email'
  | 'in_app'
  | 'whatsapp'
  | 'viber';

/** Generates a 2-digit random number (10–99) */
const r = () => Math.floor(Math.random() * 90 + 10);

const Home: React.FC = () => {
  const [analyticList, setAnalytics] = useState<ListItem[]>([]);
  const [eventList, setEvents] = useState<ListItem[]>([]);
  const history = useHistory();

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

  const resetCount = () => {
    WECapInbox.resetNotificationCount();
  };

  const getNotificationCount = () => {
    WECapInbox.getNotificationCount(
      function (count: string) {
        console.log('WebEngage: Success! notification count is - ', count);
      },
      function (err: any) {
        console.log('WebEngage: Error! notification Count', err);
      }
    );
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

  const navigateToInbox = () => {
    history.push('/notificationInbox');
  };

  const testAllMethods = () => {
    const id = r();
    console.log(`--- TEST ALL METHODS (id: ${id}) ---`);


    console.log(`[${id}] Webengage.startGAIDTracking()`);
    Webengage.startGAIDTracking();

    console.log(`[${id}] Webengage.track("test_event_${id}", { item: "shoe_${id}", price: ${id} })`);
    Webengage.track(`test_event_${id}`, { item: `shoe_${id}`, price: id });

    console.log(`[${id}] Webengage.screen("TestScreen_${id}", { section: "hero_${id}" })`);
    Webengage.screen(`TestScreen_${id}`, { section: `hero_${id}` });

    // WebengageUser methods
    console.log(`[${id}] WebengageUser.login("testUser_${id}")`);
    WebengageUser.login(`testUserAk_${id}`);

    console.log(`[${id}] WebengageUser.setAttribute("we_first_name", "John_${id}")`);
    WebengageUser.setAttribute('we_first_name', `John_${id}`);

    console.log(`[${id}] WebengageUser.setAttribute("we_last_name", "Doe_${id}")`);
    WebengageUser.setAttribute('we_last_name', `Doe_${id}`);

    console.log(`[${id}] WebengageUser.setAttribute("we_email", "john_${id}@test.com")`);
    WebengageUser.setAttribute('we_email', `john_${id}@test.com`);

    console.log(`[${id}] WebengageUser.setAttribute("we_phone", "+9199${id}${r()}${r()}")`);
    WebengageUser.setAttribute('we_phone', `+9199${id}${r()}${r()}`);

    console.log(`[${id}] WebengageUser.setAttribute("we_hashed_email", "hash_email_${id}")`);
    WebengageUser.setAttribute('we_hashed_email', `hash_email_${id}`);

    console.log(`[${id}] WebengageUser.setAttribute("we_hashed_phone", "hash_phone_${id}")`);
    WebengageUser.setAttribute('we_hashed_phone', `hash_phone_${id}`);

    // Custom attributes with specific keys and types

    // Date of Birth - Date type
    const dob = new Date(1990 + (id % 30), id % 12, (id % 28) + 1);
    console.log(`[${id}] WebengageUser.setAttribute("Date of Birth", ${dob.toISOString()})`);
    WebengageUser.setAttribute('Date of Birth', dob.toISOString());

    // Brand affinity - Array type
    const brands = [`Nike_${id}`, `Adidas_${r()}`, `Puma_${r()}`, `Reebok_${r()}`];
    console.log(`[${id}] WebengageUser.setAttribute("Brand affinity", ${JSON.stringify(brands)})`);
    WebengageUser.setAttribute('Brand affinity', brands);

    // json_object_example - Map (single level)
    const jsonObj = {
      city: `Mumbai_${id}`,
      pincode: `400${id}`,
      active: true,
      score: id,
    };
    console.log(`[${id}] WebengageUser.setAttribute("json_object_example", ${JSON.stringify(jsonObj)})`);
    WebengageUser.setAttribute('json_object_example', jsonObj);

    // map_example - Map (multi-level / nested)
    const mapExample = {
      level1_key: `value_${id}`,
      nested: {
        level2_name: `inner_${r()}`,
        level2_count: r(),
        deep: {
          level3_flag: true,
          level3_id: `deep_${id}_${r()}`,
        },
      },
      tags: [`tag_${id}`, `tag_${r()}`],
    };
    console.log(`[${id}] WebengageUser.setAttribute("map_example", ${JSON.stringify(mapExample)})`);
    WebengageUser.setAttribute('map_example', mapExample);

    // zepto - String type
    console.log(`[${id}] WebengageUser.setAttribute("zepto", "zepto_order_${id}")`);
    WebengageUser.setAttribute('zepto', `zepto_order_${id}`);

    // ProfilingAtt11 - String type
    console.log(`[${id}] WebengageUser.setAttribute("ProfilingAtt11", "profile_segment_${id}")`);
    WebengageUser.setAttribute('ProfilingAtt11', `profile_segment_${id}`);

    console.log(`[${id}] WebengageUser.setAttribute("age", ${id})`);
    WebengageUser.setAttribute('age', id);

    console.log(`[${id}] WebengageUser.setAttribute("is_premium", true)`);
    WebengageUser.setAttribute('is_premium', true);

    console.log(`[${id}] WebengageUser.setLocation(${19 + id * 0.01}, ${72 + id * 0.01})`);
    WebengageUser.setLocation(19 + id * 0.01, 72 + id * 0.01);

    console.log(`[${id}] WebengageUser.setDevicePushOptIn(true)`);
    WebengageUser.setDevicePushOptIn(true);

    console.log(`[${id}] WebengageUser.setUserOptIn("push", true)`);
    WebengageUser.setUserOptIn('push', true);

    console.log(`[${id}] WebengageUser.setUserOptIn("sms", true)`);
    WebengageUser.setUserOptIn('sms', true);

    console.log(`[${id}] WebengageUser.setUserOptIn("email", true)`);
    WebengageUser.setUserOptIn('email', true);

    console.log(`[${id}] WebengageUser.setUserOptIn("in_app", true)`);
    WebengageUser.setUserOptIn('in_app', true);

    console.log(`[${id}] WebengageUser.setUserOptIn("whatsapp", true)`);
    WebengageUser.setUserOptIn('whatsapp', true);

    console.log(`[${id}] WebengageUser.setUserOptIn("viber", true)`);
    WebengageUser.setUserOptIn('viber', true);

    // Track multiple events with attributes
    console.log(`[${id}] Webengage.track("product_viewed_${id}", { ... })`);
    Webengage.track(`product_viewed_${id}`, {
      product_name: `Widget_${id}`,
      price: id * 10,
      currency: 'INR',
      is_available: true,
    });

    console.log(`[${id}] Webengage.track("cart_updated_${id}", { ... })`);
    Webengage.track(`cart_updated_${id}`, {
      cart_size: id,
      total_amount: id * 99,
      coupon_applied: false,
    });

    // Notification Inbox methods
    console.log(`[${id}] WECapInbox.getNotificationCount()`);
    WECapInbox.getNotificationCount(
      (count) => console.log(`[${id}] Inbox count: ${count}`),
      (err) => console.log(`[${id}] Inbox count error: ${err}`)
    );

    console.log(`[${id}] WECapInbox.getNotificationList(null)`);
    WECapInbox.getNotificationList(
      null,
      (response) => console.log(`[${id}] Inbox list: hasNext=${response.hasNext}, count=${response.messageList.length}`),
      (err) => console.log(`[${id}] Inbox list error: ${err}`)
    );

    console.log(`[${id}] WECapInbox.resetNotificationCount()`);
    WECapInbox.resetNotificationCount();

    // Logout at the end
    // console.log(`[${id}] WebengageUser.logout()`);
    // WebengageUser.logout();

    console.log(`--- TEST ALL METHODS COMPLETE (id: ${id}) ---`);
    alert(`Test All Methods executed! Check console logs. (id: ${id})`);
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

        <IonItem button onClick={navigateToInbox}>
          <div slot="start" className="dot"></div>
          <IonLabel className="ion-text-wrap">
            <h2>Notification Inbox</h2>
          </IonLabel>
        </IonItem>

        <IonItem button onClick={getNotificationCount}>
          <div slot="start" className="dot"></div>
          <IonLabel className="ion-text-wrap">
            <h2>Get Notification Count</h2>
          </IonLabel>
        </IonItem>

        <IonItem button onClick={resetCount}>
          <div slot="start" className="dot"></div>
          <IonLabel className="ion-text-wrap">
            <h2>Reset Count</h2>
          </IonLabel>
        </IonItem>

        <IonButton expand="block" color="success" className="ion-margin" onClick={testAllMethods}>
          Test All Methods
        </IonButton>

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
