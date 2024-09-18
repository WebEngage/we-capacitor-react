import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  useIonViewWillEnter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import {
  Webengage,
  WebengagePush,
  WebengageNotification,
} from "@awesome-cordova-plugins/webengage";
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { isPlatform } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

// WebEngage Push notification handlers
WebengagePush.onClick(function (deeplink: any, customData: any) {
  console.log("DEBUG: Push clicked", deeplink, customData);
});

WebengageNotification.onShown(function (inAppData: any) {
  console.log("In-app notification shown", inAppData);
});

WebengageNotification.onDismiss(function (inAppData: any) {
  console.log("In-app notification dismissed", inAppData);
});

WebengageNotification.onClick(function (inAppData: any, actionId: any) {
  console.log("In-app notification clicked", inAppData, actionId);
});

// Engage WebEngage
Webengage.engage();

    // Request iOS Push Notification permissions
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        console.log("DEBUG: Push notification permission Accepted");

        // Register for push notifications
        PushNotifications.register();
      } else {
        console.log("DEBUG: Push notification permission denied");
      }
    });

    // Listen for registration success and save the push token
    PushNotifications.addListener('registration', (token: Token) => {
      console.log('DEBUG: Push registration success, token: ' + token.value); // called
      // Send this token to your server or WebEngage for notification purposes
    });

    // Listen for registration errors
    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('DEBUG: Error during push registration', error);
    });

    // Handle incoming push notifications
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('DEBUG: Push notification received:', notification); // called in foreground!
      // Handle notification display here (e.g., show an alert or update the UI)
    });

    // Handle notification action performed (user interaction with notification)
    PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('DEBUG: Notification action performed:', action); // called in background
      alert('Action performed: ' + action?.notification?.title);
      // Handle the action from the notification click (e.g., navigate to a specific page)
    });

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Route path="/" exact={true}>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
