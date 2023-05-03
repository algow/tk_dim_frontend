import {
  createBrowserRouter,
  RouterProvider  
} from "react-router-dom";
import Login from './views/Login';
import { JWT_LOCAL } from "./utils/constants";
import Default from "./components/Default";
import Notification from './components/Notification';
import { useState } from "react";
import { getNotifData } from "./utils/utils";
import { NotificationContext } from "./utils/context";

function App() {
  // const navigate = useNavigate();

  const unrestrictedRoutes = createBrowserRouter([
    {
      path: "*",
      element: <Default />
    },
    {
      path: "/login",
      element: <Login />
    },
  ]);

  const restrictedRoutes = createBrowserRouter([
    {
      path: "*",
      element: <Default />
    },
  ]);

  const [openMessage, setOpenMessage] = useState({
    open: false,
    ...getNotifData(0)
  });

  const handleOpenMessage = (details) => {
    setOpenMessage({
      open: true, 
      ...details
    });
  }
  
  const handleCloseMessage = () => {
    setOpenMessage({
      open: false,
      ...getNotifData(0)
    });
  };


  return (
    <>
      <Notification
        openMessage={openMessage.open} 
        handleCloseMessage={handleCloseMessage}
        message={openMessage.message} 
        type={openMessage.type} 
      />
        <NotificationContext.Provider
          value={{
            open: openMessage.open,
            type: openMessage.type,
            message: openMessage.message,
            onOpenMessage: handleOpenMessage
          }}
        >
        {
          localStorage.getItem(JWT_LOCAL) ? (
            // <NavigateContext.Provider value={{navigate}}> 
              <RouterProvider router={restrictedRoutes} />
            // </NavigateContext.Provider>
          ) : (
            // <NavigateContext.Provider value={{navigate}}> 
              <RouterProvider router={unrestrictedRoutes} />
            // </NavigateContext.Provider>
          )
        }
      </NotificationContext.Provider>
    </>
  );
}

export default App;
