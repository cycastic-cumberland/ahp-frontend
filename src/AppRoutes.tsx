import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.tsx';
import CalculationMatrix from './pages/CalculationMatrix.tsx';
import CriteriaComparisonMatrix from './pages/CriteriaComparisonMatrix.tsx';
import LandingPage from './components/LandingPage.tsx';


const AppRoutes =[
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <LandingPage/>
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