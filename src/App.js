import {
  createBrowserRouter,
  RouterProvider  
} from "react-router-dom";
import Login from './views/Login';
import { JWT_LOCAL } from "./utils/constants";
import Default from "./components/Default";
// import { NavigateContext } from "./utils/context";

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

  return (
    <> 
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
    </>
  );
}

export default App;
