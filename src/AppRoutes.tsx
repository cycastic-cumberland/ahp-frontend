import LandingPage from "./components/LandingPage.tsx";
import CalculationMatrix from './pages/calculationMatrix.tsx';


const AppRoutes =[
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/calculationMatrix",
        element: <CalculationMatrix/>
    },
]

export default AppRoutes;