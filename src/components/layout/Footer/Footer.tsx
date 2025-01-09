import { IonFooter, IonToolbar, IonTitle } from "@ionic/react";
import "./Footer.css";

// Config
import { siteConfig } from "../../../core/config/siteConfig";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonTitle size="small" className="ion-text-center">
          {siteConfig.copyright}
        </IonTitle>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
