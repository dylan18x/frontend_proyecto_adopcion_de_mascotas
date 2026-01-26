import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { privateRoutes } from "./private.routes";
import RequireAuth from "./RequireAuth";
import PrivateLayout from "../layouts/PrivateLayout";
import { UiProvider } from "../context/UiContext";

export const appRoutes: RouteObject[] = [
  publicRoutes,
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <UiProvider>
          <PrivateLayout />
        </UiProvider>
      </RequireAuth>
    ),
    children: privateRoutes.children,
  },
];
