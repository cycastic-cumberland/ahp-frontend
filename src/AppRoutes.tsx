<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom';
import Layouts from './layouts/Layouts.tsx';
import Landing from "./pages/LandingPage.tsx";
=======
import LandingPage from "./components/LandingPage.tsx";
>>>>>>> f676d72bc93c540a304cc3c49172a208e3f772ab
import CalculationMatrix from './pages/calculationMatrix.tsx';
import CriteriaComparisonMatrix from './pages/criteriaComparisonMatrix.tsx';

const AppRoutes =[
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/calculationMatrix",
        element: <CalculationMatrix/>
    },
    {
        path: "/criteriaComparisonMatrix",
        element: <CriteriaComparisonMatrix/>
    },
]

export default AppRoutes;