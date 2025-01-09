import React from "react";
import { IonContent, IonPage, IonText, IonButton } from "@ionic/react";

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center">
        <div className="ion-padding">
          <h1>404</h1>
          <IonText>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
          </IonText>
          <IonButton routerLink="/home">Go to Home</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
