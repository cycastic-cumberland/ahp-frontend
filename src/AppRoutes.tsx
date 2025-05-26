import MainLayout from './layouts/MainLayout.tsx';
import LandingPage from "./pages/LandingPage.tsx";
import CalculationMatrix from './pages/CalculationMatrix.tsx';
import CriteriaComparisonMatrix from './pages/CriteriaComparisonMatrix.tsx';
import HistoryPage from './pages/HistoryPage.tsx';
import Charts from './pages/Charts.tsx';
import FilesUpload from './components/FilesUpload.tsx';
import MatrixUploadPage from './pages/MatrixUploadPage.tsx';

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
                path: "/history",
                element: <HistoryPage/>
            },
            {
                path: "/charts",
                element: <Charts/>
            },
            {
                path: "/files-upload",
                element: <MatrixUploadPage/>
            },
        ]
    },
]

export default AppRoutes;