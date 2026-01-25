import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { appRoutes } from "./routes/app.routes";
import type {JSX} from 'react'

export default function App(): JSX.Element {
  const element = useRoutes(appRoutes);
  return <AuthProvider>{element}</AuthProvider>;
}