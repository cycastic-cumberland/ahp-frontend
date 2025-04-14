import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.tsx';
import Landing from "./pages/LandingPage.tsx";
import CalculationMatrix from './pages/CalculationMatrix.tsx';
import CriteriaComparisonMatrix from './pages/CriteriaComparisonMatrix.tsx';


const AppRoutes =[
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Landing/>
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
    },
]

export default AppRoutes;