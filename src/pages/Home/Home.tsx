import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Home.css";
import PremierLeagueMarket from "../../components/market/premier-league";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>Home Page</IonContent>
      <PremierLeagueMarket />
    </IonPage>
  );
};

export default Home;
