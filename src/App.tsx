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
  WebengageUser,
  WebengageJwtManager,
} from "@awesome-cordova-plugins/webengage";
import { PushNotifications } from "@capacitor/push-notifications";

import { WEAndroidFCM } from "we-cap-android-fcm";

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
import NotificationInbox from "./pages/NotificationInbox";

setupIonicReact();
// Uncomment the below line After following push Docs
WEAndroidFCM.updateToken();

registerForPushNotificaiton();
WebengagePush.onClick(function (deeplink: any, customData: any) {
  console.log("Push clicked");
});

WebengageJwtManager.tokenInvalidatedCallback(function (args: any) {
  console.log("WebEngage: Invalid Token passed. Please update your token args- ",args)
  alert("Invalid Token passed. Please update your token")
  console.log("WebEngage: 401: Updating WebEngage Token!")
  // Pass your update your secureToken 
  // WebengageUser.setSecureToken(userId,secureToken)
});

WebengageNotification.onPrepared(function (inAppData: any) {
  console.log("In-app onPrepared- ", JSON.stringify(inAppData));
});

WebengageNotification.onShown(function (inAppData: any) {
  console.log("In-app shown - ", JSON.stringify(inAppData));
});

WebengageNotification.onDismiss(function (inAppData: any) {
  console.log("In-app dismissed- ", JSON.stringify(inAppData));
});

WebengageNotification.onClick(function (inAppData: any, actionId: any) {
  console.log("In-app click- ", JSON.stringify(inAppData));
});
Webengage.engage();
// Webengage.engage({ android: { autoGAIDTracking: true } }); // Enable GAID tracking

function registerForPushNotificaiton() {
  PushNotifications.register();
  PushNotifications.requestPermissions().then((result) => {
    if (result.receive === "granted") {
      // Permission granted
      WebengageUser.setDevicePushOptIn(true);
    } else {
      // Permission denied
      WebengageUser.setDevicePushOptIn(false);
    }
  });
}

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
