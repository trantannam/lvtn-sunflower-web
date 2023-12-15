import 'react-notifications/lib/notifications.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import { Fragment } from 'react';
import { NotificationContainer } from "react-notifications";

function App() {

  return (
    <>
        <Router>
          <div className='App'>
            <Routes>
              {publicRoutes.map((route, index) => {

                const Page = route.component

                let Layout = DefaultLayout

                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment
                }
                return <Route key={index} path={route.path} element={
                  <Layout >
                    <Page />
                  </Layout>
                } />
              })}
            </Routes>
          </div>
        </Router>
      <NotificationContainer />
    </>
  );
}

export default App;
