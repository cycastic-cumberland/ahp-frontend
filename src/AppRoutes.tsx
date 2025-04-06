import { Routes, Route, Navigate } from 'react-router-dom';
import Layouts from './layouts/Layouts.tsx';
import Landing from "./pages/landing.tsx";
import CalculationMatrix from './pages/calculationMatrix.tsx';
import CriteriaComparisonMatrix from './pages/criteriaComparisonMatrix.tsx';


const AppRoutes =[
    {
        path: "/",
        element: <Layouts />,
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