import { IonContent, IonPage } from "@ionic/react";

// Components
import SideMenu from "./SideMenu/SideMenu";
import Header from "./Header/Header";
import Container from "./Container/Container";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header title={title} />
        <IonContent>
          <Container>{children}</Container>
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default Layout;
