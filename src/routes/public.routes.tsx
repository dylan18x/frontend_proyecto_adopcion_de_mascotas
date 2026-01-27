import type { RouteObject } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PublicPostDetail from "../pages/public/PublicPostDetail";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import LandingPage from "../pages/public/LandingPage";
import PublicHome from "../pages/public/PublicHome";

export const publicRoutes: RouteObject = {
  path: "/",
  element: <PublicLayout />,
  children: [
    { index: true, element: <LandingPage /> }, 
    
    { path: "noticias", element: <PublicHome /> }, 
    
    { path: "posts/:id", element: <PublicPostDetail /> },
    { path: "auth/login", element: <Login /> },
    { path: "auth/register", element: <Register /> },
  ],
};