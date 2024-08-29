import { Route, Routes } from "react-router-dom";
import LoginPage from "../LoginPage.tsx";
import AuthRoutes from "./AuthRoutes.tsx";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login/" element={<LoginPage />} />
      <Route path="/*" element={<AuthRoutes />} />
    </Routes>
  );
};

export default MainRoutes;
