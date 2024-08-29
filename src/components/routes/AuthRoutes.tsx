import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../AppLayout.tsx";
import UserList from "../pages/users/UserList.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import GroupList from "../pages/groups/GroupList.tsx";
import UserDetails from "../pages/users/UserDetails.tsx";
import UserPane from "../pages/users/UserPane.tsx";
import useAuth from "../../hooks/useAuth.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";

const AuthRoutes = () => {
  const { user, isLoading: isUserLoading } = useAuth();

  if (isUserLoading) {
    return <LoadingComponent />;
  }

  if (user == null) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/users/" />} />
        <Route path="users/" element={<UserPane />}>
          <Route index element={<UserList />} />
          <Route path=":userId/" element={<UserDetails />} />
        </Route>
        <Route path="groups/" element={<GroupList />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AuthRoutes;
