import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
} from "@ionic/react";
import "./Header.css";

// Config
import { siteConfig } from "../../../core/config/siteConfig";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = siteConfig.name }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton fill="clear" routerLink="/home">
            {title}
          </IonButton>
        </IonButtons>

        <IonButtons slot="end">
          <IonMenuButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
