// noinspection TypeScriptValidateTypes

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route
            key={route.path || index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;