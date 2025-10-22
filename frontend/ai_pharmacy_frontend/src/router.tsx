import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/defaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/dashboard";

const router = createBrowserRouter([
  {
    path:'/',
    element: <DefaultLayout />,
    children: [
      
      {
        path:'/',
        element: <Dashboard />
      }
    ]
  },
  {
    path:'/',
    element: <GuestLayout />,
    children: [
        {
          path: '/login',
          element: <LoginPage />
        },
    ]
  },
  {
    path:'*',
    element: <NotFound />
  }
]);

export default router;