import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import MainLayout from "./layouts/MainLayout.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {AppRoutes.map((route, index) => (
                    <Route
                        key={route.path || index}
                        path={route.path}
                        element={<MainLayout>{route.element}</MainLayout>}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
