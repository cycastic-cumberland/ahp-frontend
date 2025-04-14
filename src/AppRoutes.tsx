import LandingPage from "./components/LandingPage.tsx";
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