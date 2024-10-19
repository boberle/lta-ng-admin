import { Route, Routes } from "react-router-dom";
import LoginPage from "../LoginPage.tsx";
import AuthRoutes from "./AuthRoutes.tsx";
import Landing from "../landing/Landing.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import Presentation from "../landing/Presentation.tsx";
import PrivacyPolicyApp from "../landing/PrivacyPolicyApp.tsx";
import LegalNotice from "../landing/LegalNotice.tsx";
import PrivacyPolicySite from "../landing/PrivacyPolicySite.tsx";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route index element={<Presentation />} />
        <Route path="privacy-policy-app/" element={<PrivacyPolicyApp />} />
        <Route path="privacy-policy-site/" element={<PrivacyPolicySite />} />
        <Route path="legal/" element={<LegalNotice />} />
      </Route>
      <Route path="/login/" element={<LoginPage />} />
      <Route path="/console/*" element={<AuthRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRoutes;
