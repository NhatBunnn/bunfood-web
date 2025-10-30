import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/route";
import { Fragment } from "react/jsx-runtime";
import "./i18n";

function App() {
  return (
    <Router>
      <div className="App">
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
          {/* 
            {privateRoutes.map((route, index) => {
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
                    <PrivateRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </PrivateRoute>
                  }
                />
              );
            })}

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
            })} */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
