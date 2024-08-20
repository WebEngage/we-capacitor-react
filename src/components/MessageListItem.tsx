import { IonItem, IonLabel, useIonAlert } from "@ionic/react";
import { ListItem } from "../data/listItem";
import "./MessageListItem.css";
import { Webengage, WebengageUser } from "@awesome-cordova-plugins/webengage";
import { useState } from "react";

interface MessageListItemProps {
  message: ListItem;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  const [presentAlert] = useIonAlert();
  // const [input, setInput] = useState<String>('');
  function handleClick(title: String) {
    switch (title) {
      case "Perform Login": {
        presentAlert({
          header: "Alert",
          message: "Enter your user name and token",
          inputs: [
            {
              name: 'username',
              type: 'text',
              placeholder: 'User Name'
            },
            {
              name: 'token',
              type: 'text',
              placeholder: 'JWT Token'
            }
          ],
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input:any) {
                const username = input.username;
                const secureToken = input.token;
                console.log("Username:", username);
                console.log("JWT Token:", secureToken);
                WebengageUser.login(String(username), String(secureToken));
              },
            },
          ],
        });
        
        break;
      }
      case "Update Secure Token": {
        presentAlert({
          header: "Alert",
          message: "Enter your user name and token",
          inputs: [
            {
              name: 'username',
              type: 'text',
              placeholder: 'User Name'
            },
            {
              name: 'token',
              type: 'text',
              placeholder: 'JWT Token'
            }
          ],
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input:any) {
                const username = input.username;
                const secureToken = input.token;
                console.log("Username:", username);
                console.log("JWT Token:", secureToken);
                WebengageUser.setSecureToken(String(username), String(secureToken));
              },
            },
          ],
        });
        
        break;
      }
      case "Perform Logout": {
        presentAlert({
          header: "Logout",
          message: "You are logged out",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler() {
                WebengageUser.logout();
              },
            },
          ],
        });
        break;
      }
      case "Set First Name": {
        presentAlert({
          header: "Set User Details",
          message: "Please enter your first name.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input) {
                WebengageUser.setAttribute("we_first_name", input[0]);
              },
            },
          ],
          inputs: [
            {
              placeholder: "Name",
            },
          ],
        });
        break;
      }
      case "Set Second Name": {
        presentAlert({
          header: "Set User Details",
          message: "Please enter your seond name.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input) {
                WebengageUser.setAttribute("we_last_name", input[0]);
              },
            },
          ],
          inputs: [
            {
              placeholder: "Last Name",
            },
          ],
        });
        break;
      }
      case "Set User Email": {
        presentAlert({
          header: "Set User Email",
          message: "Please enter your email.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input) {
                WebengageUser.setAttribute("we_email", input[0]);
              },
            },
          ],
          inputs: [
            {
              placeholder: "Email",
            },
          ],
        });
        break;
      }
      case "Set User Hashed Email": {
        presentAlert({
          header: "Set Hashed Email",
          message: "Please enter your hashed email.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input) {
                WebengageUser.setAttribute("we_hashed_email", input[0]);
              },
            },
          ],
          inputs: [
            {
              placeholder: "Hashed Email",
            },
          ],
        });
        break;
      }
      case "Set User Phone": {
        presentAlert({
          header: "Set Phone Number",
          message: "Please enter your phone.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input) {
                WebengageUser.setAttribute("we_phone", input[0]);
              },
            },
          ],
          inputs: [
            {
              placeholder: "Phone Number",
            },
          ],
        });
        break;
      }
      case "Set User Hashed Phone": {
        presentAlert({
          header: "Set Hashed Phone Number",
          message: "Please enter your hashed phone number.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input) {
                WebengageUser.setAttribute("we_hashed_phone", input[0]);
              },
            },
          ],
          inputs: [
            {
              placeholder: "Hashed Phone Number",
            },
          ],
        });
        break;
      }
      case "Set User Location": {
        presentAlert({
          header: "Alert",
          message: "Enter Latitude and Longitude",
          inputs: [
            {
              name: 'latitude',
              type: 'text',
              placeholder: 'Latitude'
            },
            {
              name: 'longitude',
              type: 'text',
              placeholder: 'longitude'
            }
          ],
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input:any) {
                const latitude = input.latitude;
                const longitude = input.longitude;
                console.log("latitude:", latitude);
                console.log("longitude:", longitude);
                WebengageUser.setLocation(latitude, longitude);
              },
            },
          ],
        });
        break;
      }
      case "Set Screen Name": {
        presentAlert({
          header: "Set Screen Name",
          message: "Please enter screen name.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input) {
                Webengage.screen(String(input[0]));
              },
            },
          ],
          inputs: [
            {
              placeholder: "Screen name",
            },
          ],
        });
        break;
      }
      case "Set Event Name": {
        presentAlert({
          header: "Set Event Name",
          message: "Please enter event name.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler(input) {
                Webengage.track(String(input[0]));
              },
            },
          ],
          inputs: [
            {
              placeholder: "Event name",
            },
          ],
        });
        break;
      }
    }
  }

  return (
    <IonItem button onClick={() => handleClick(message.title)}>
      <div slot="start" className="dot"></div>
      <IonLabel className="ion-text-wrap">
        <h2>{message.title}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
