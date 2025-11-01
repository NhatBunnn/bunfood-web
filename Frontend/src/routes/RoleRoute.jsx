import { useEffect, useState } from "react";
import { Loading } from "@components/index";
import { useToken } from "@context/auth/TokenContext";
import { useUser } from "@context/user/UserContext";
import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles = [] }) {
  const { user, loading: userLoading } = useUser();
  const { getRoles } = useToken();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (user) {
        const userRoles = await getRoles();
        setRoles(userRoles);
      }
      setLoading(false);
    };
    fetchRoles();
  }, [user, getRoles]);

  if (userLoading || loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.some((role) => allowedRoles.includes(role))) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

export default RoleRoute;
