import { RouteObject } from "react-router-dom";

export const AppRoutes: RouteObject[] = [
  {
    path: "/",
    element: <h1>Home Page</h1>, 
  },
  {
    path: "/about",
    element: <h1>About Page</h1>,
  },
];