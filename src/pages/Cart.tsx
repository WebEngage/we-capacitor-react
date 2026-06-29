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

const Cart: React.FC = () => {
  const history = useHistory();

  useIonViewWillEnter(() => {
    Webengage.screen("cart");
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h1>Cart</h1>
        <IonButton expand="block" onClick={() => history.push("/home")}>
          Go to Home
        </IonButton>
        <IonButton expand="block" onClick={() => history.push("/orders")}>
          Go to Orders
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
