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

import { WEAndroidFCM } from "webengage-android-fcm";

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
// Uncomment the below line After following push Docs
// WEAndroidFCM.updateToken();
WebengagePush.onClick(function (deeplink: any, customData: any) {
  console.log("Push clicked");
});

WebengageNotification.onShown(function (inAppData: any) {
  console.log("In-app shown");
});

WebengageNotification.onDismiss(function (inAppData: any) {
  console.log("In-app dismissed");
});

WebengageNotification.onClick(function (inAppData: any, actionId: any) {
  console.log("In-app shown");
});
Webengage.engage();

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
