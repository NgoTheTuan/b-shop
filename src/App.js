import { publicRoutes, privateRoutes } from "./routes/index";
import ProtectRoute from "./routes/ProtectRoute";
import PublicRoute from "./routes/PublicRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import "./style/index.scss";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PublicRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </PublicRoute>
                }
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            let Layout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectRoute>
                }
              />
            );
          })}
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
