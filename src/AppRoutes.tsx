import { Routes, Route, Navigate } from 'react-router-dom';
import Layouts from './layouts/Layouts.tsx';


const AppRoutes =[
    {
        path: "/",
        element: <Layouts />,
    },
]

export default AppRoutes;