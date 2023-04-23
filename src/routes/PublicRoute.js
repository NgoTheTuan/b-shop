import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token-b-shop");
  const location = useLocation();
  const navigate = useNavigate();

  if (token) {
    if (location?.pathname === "/login" || location?.pathname === "/register") {
      navigate("/");
    } else {
      return <>{children}</>;
    }
  } else {
    return <>{children}</>;
  }
}

export default PublicRoute;
