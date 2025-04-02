import { Routes, Route, Navigate } from 'react-router-dom';
import Layouts from './layouts/Layouts.tsx';
import Landing from "./pages/landing.tsx";


const AppRoutes =[
    {
        path: "/",
        element: <Layouts />,
        children: [
            {
                path: "/landing",
                element: <Landing/>
            },

        ]
    },
]

export default AppRoutes;