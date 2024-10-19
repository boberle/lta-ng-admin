import { Route, Routes } from "react-router-dom";
import LoginPage from "../LoginPage.tsx";
import AuthRoutes from "./AuthRoutes.tsx";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login/" element={<LoginPage />} />
      <Route path="/console/*" element={<AuthRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRoutes;
