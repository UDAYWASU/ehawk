import { Navigate } from "react-router-dom";

import { getRole, isLoggedIn } from "@/utils/auth";

interface Props {
  children: React.ReactNode;
}

function AdminRoute({ children }: Props) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" />;
  }

  if (getRole() !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;