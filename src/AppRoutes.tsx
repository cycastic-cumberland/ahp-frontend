import LandingPage from "./pages/LandingPage.tsx";
import CalculationMatrix from './pages/CalculationMatrix.tsx';


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