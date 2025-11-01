import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { adminRoutes, publicRoutes } from "./routes/route";
import { Fragment } from "react/jsx-runtime";
import "./i18n";
import GlobalProviders from "@context/GlobalProviders";
import RoleRoute from "routes/RoleRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalProviders>
          <Routes>
            {/* Public routes */}
            {publicRoutes.map((route, index) => {
              const Page = route.Page;
              let Layout = Fragment;

              if (route.Layout) {
                Layout = route.Layout;
              } else {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            {/* admin routes */}
            {adminRoutes.map((route, index) => {
              const Page = route.Page;
              let Layout = Fragment;

              if (route.Layout) {
                Layout = route.Layout;
              } else {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <RoleRoute allowedRoles={route.roles}>
                      <Layout>
                        <Page />
                      </Layout>
                    </RoleRoute>
                  }
                />
              );
            })}
          </Routes>
        </GlobalProviders>
      </div>
    </Router>
  );
}

export default App;
