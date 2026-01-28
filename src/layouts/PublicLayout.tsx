import { Box, Container } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import PublicHeader from "../components/public/PublicHeader";
import PublicFooter from "../components/public/PublicFooter";
import type { JSX } from "react";

export default function PublicLayout(): JSX.Element {
  const { pathname } = useLocation();

  const isLanding = pathname === "/";
  const isAuth = pathname.includes("/auth/");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      
      {!isLanding && !isAuth && <PublicHeader />}
      {!isLanding && !isAuth && <Box sx={{ height: "64px" }} />}

      {isLanding ? (
        <Outlet />
      ) : (
        <Container 
          maxWidth={isAuth ? "sm" : "md"} 
          sx={{ 
            py: isAuth ? 0 : 3, 
            display: isAuth ? "flex" : "block",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: isAuth ? "100vh" : "auto" 
          }}
        >
          <Outlet />
        </Container>
      )}
      {!isLanding && !isAuth && <PublicFooter />}
    </Box>
  );
}