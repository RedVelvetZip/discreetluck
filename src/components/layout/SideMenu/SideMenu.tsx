import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./SideMenu.css";

// Config
import { siteConfig } from "../../../core/config/siteConfig";
import { routes } from "../../../router/routesConfig";

const SideMenu: React.FC = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{siteConfig.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {routes
            .filter((route) => route.showInMenu)
            .map((route) => (
              <IonMenuToggle key={route.path} autoHide={false}>
                <IonItem routerLink={route.path}>
                  {route.icon && <IonIcon icon={route.icon} slot="start" />}
                  <IonLabel>{route.name}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
