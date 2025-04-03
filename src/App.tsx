// noinspection TypeScriptValidateTypes

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {AppRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}>
                        {route.children?.map((child, idx) => (
                            <Route key={idx} path={child.path} element={child.element} />
                        ))}
                    </Route>
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
