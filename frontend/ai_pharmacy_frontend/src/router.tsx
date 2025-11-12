import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/defaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/dashboard";
import Inventory from "./views/Inventory";
import Suppliers from "./views/Suppliers";
import Profile from "./views/Profile";
import DemandPrediction from "./views/AI/DemandPrediction";
import AnomalyDetection from "./views/AI/AnomalyDetection";
import ExpiryRisk from "./views/AI/ExpiryRisk";
import ReorderSuggestion from "./views/AI/ReorderSuggestion";
import RevenueInsights from "./views/AI/RevenueInsights";
import SupplierRecommendation from "./views/AI/SupplierRecommendation";

const router = createBrowserRouter([
  {
    path:'/',
    element: <DefaultLayout />,
    children: [
      
      {
        path:'/',
        element: <Dashboard />
      },
      {
        path:'/inventory',
        element: <Inventory />
      },
      {
        path:'/suppliers',
        element: <Suppliers />
      },
      {
        path:'/profile',
        element: <Profile />
      },
      {
        path:'/AI/DemandPrediction',
        element: <DemandPrediction />
      },
      {
        path:'/AI/AnomalyDetection',
        element: <AnomalyDetection />
      },
      {
        path:'/AI/ExpiryRisk',
        element: <ExpiryRisk />
      },
      {
        path: '/AI/ReoorderSuggestion',
        element: <ReorderSuggestion />
      },
      {
        path:'/AI/RevenueInsights',
        element: <RevenueInsights />
      },
      {
        path:'/AI/SupplierRecommendation',
        element: <SupplierRecommendation />
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