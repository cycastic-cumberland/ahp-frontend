import LandingPage from "./components/LandingPage.tsx";
import CalculationMatrix from './pages/CalculationMatrix.tsx';
import CriteriaComparisonMatrix from './pages/CriteriaComparisonMatrix.tsx';

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