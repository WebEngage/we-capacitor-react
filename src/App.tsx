import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import NotificationInbox from './pages/NotificationInbox';
import {
  Webengage,
  WebengagePush,
  WebengageNotification,
  WebengageUser,
  WebengageJwtManager,
} from '@awesome-cordova-plugins/webengage';
import { PushNotifications } from '@capacitor/push-notifications';
// import { WEAndroidFCM } from 'we-cap-android-fcm';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

// Uncomment the below line after following push docs
// WEAndroidFCM.updateToken();

// registerForPushNotification();

WebengagePush.onClick(function (deeplink: any, customData: any) {
  console.log('Push clicked - deeplink:', deeplink, 'customData:', customData);
});

WebengageJwtManager.tokenInvalidatedCallback(function (args: any) {
  console.log('WebEngage: Invalid Token passed. Please update your token args- ', args);
  alert('Invalid Token passed. Please update your token');
  console.log('WebEngage: 401: Updating WebEngage Token!');
  // Pass your updated secureToken
  // WebengageUser.setSecureToken(userId, secureToken)
});

WebengageNotification.onPrepared(function (inAppData: any) {
  console.log('In-app onPrepared- ', JSON.stringify(inAppData));
});

WebengageNotification.onShown(function (inAppData: any) {
  console.log('In-app shown - ', JSON.stringify(inAppData));
});

WebengageNotification.onDismiss(function (inAppData: any) {
  console.log('In-app dismissed- ', JSON.stringify(inAppData));
});

WebengageNotification.onClick(function (inAppData: any, actionId: any) {
  console.log('In-app click- ', JSON.stringify(inAppData));
});

Webengage.engage();

// function registerForPushNotification() {
//   PushNotifications.register();
//   PushNotifications.requestPermissions().then((result) => {
//     if (result.receive === 'granted') {
//       WebengageUser.setDevicePushOptIn(true);
//     } else {
//       WebengageUser.setDevicePushOptIn(false);
//     }
//   });
// }

async function initWePush() {
  // Webengage.engage();
  console.log("push initWePush called")


    // Step 2: Request push permission and register with FCM
    const permStatus = await PushNotifications.requestPermissions();
    if (permStatus.receive !== 'granted') {
      console.warn('Push notification permission not granted');
      return;
    } else {
      console.warn('Push notification permission granted');
      // Important for Android 13+ for push permission
      WebengageUser.setDevicePushOptIn(true);
    }

    await PushNotifications.register();

    // NOTE - Using @capacitor/push-notifications listeners to replicate Client's behavior, No code related to WebEngage here!
    PushNotifications.addListener('registration', (token) => {
      console.log('FCM Token from @capacitor/push-notifications in App.tsx: ', token.value);
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error:', error);
    });

    // Step 4: Pass push payload to WebEngage
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push received from @capacitor/push-notifications in App.tsx: ', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      console.log('Push action performed from @capacitor/push-notifications in App.tsx:', action);
    });
  }

initWePush();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path="/notificationInbox" exact={true}>
            <NotificationInbox />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
