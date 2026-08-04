import { Navigate } from "react-router-dom";

import { getRole, isLoggedIn } from "@/utils/auth";

interface Props {
  children: React.ReactNode;
}

function HawkerRoute({ children }: Props) {
  if (!isLoggedIn()) {
    return <Navigate to="/hawker/login" />;
  }

  if (getRole() !== "hawker") {
    return <Navigate to="/" />;
  }

  return children;
}

export default HawkerRoute;