import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Webengage } from "@awesome-cordova-plugins/webengage";

const Orders: React.FC = () => {
  const history = useHistory();

  useIonViewWillEnter(() => {
    Webengage.screen("orders");
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h1>Orders</h1>
        <IonButton expand="block" onClick={() => history.push("/home")}>
          Go to Home
        </IonButton>
        <IonButton expand="block" onClick={() => history.push("/cart")}>
          Go to Cart
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Orders;
