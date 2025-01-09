import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect, Switch } from "react-router-dom";

// Routes
import { routes } from "./routesConfig";

// Components
import Layout from "../components/layout/Layout";

const Router: React.FC = () => {
  return (
    <Layout>
      <IonRouterOutlet>
        <Switch>
          {/* Root redirect */}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          {/* Render dynamic routes */}
          {routes.map(({ path, component: Component, exact, redirectTo }) =>
            redirectTo ? (
              <Route key={path} path={path} exact={exact}>
                <Redirect to={redirectTo} />
              </Route>
            ) : (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={() => (Component ? <Component /> : null)}
              />
            )
          )}
        </Switch>
      </IonRouterOutlet>
    </Layout>
  );
};

export default Router;
