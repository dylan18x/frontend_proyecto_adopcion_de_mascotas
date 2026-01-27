import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

type Props = {
  allow: string[];
  children: JSX.Element;
};

export default function RequireRole({ allow, children }: Props): JSX.Element {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;

  const ok = allow.map(r => r.toUpperCase()).includes(user.role.toUpperCase());

  if (!ok) return <Navigate to="/dashboard/forbidden" replace />;

  return children;
}
