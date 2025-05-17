import MainLayout from './layouts/MainLayout.tsx';
import LandingPage from "./pages/LandingPage.tsx";
import CalculationMatrix from './pages/CalculationMatrix.tsx';
import CriteriaComparisonMatrix from './pages/CriteriaComparisonMatrix.tsx';
import Charts from './pages/Charts.tsx';

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
            {
                path: "/charts",
                element: <Charts/>
            },
        ]
    },
]

export default AppRoutes;