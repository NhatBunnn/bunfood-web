import { API_URL } from "@config/apiConfig";
import { useToken } from "@context/auth/TokenContext";
import useAppBase from "@hooks/useAppBase";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const { te, ts, loading, setLoading, addToast } = useAppBase();
  const { setToken } = useToken();

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    if (email === "") {
      addToast(te("AUTH_EMAIL_REQUIRED"), "error");
      return;
    }

    if (password === "") {
      addToast(te("AUTH_PASSWORD_REQUIRED"), "error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        addToast(ts("AUTH_LOGIN_SUCCESS"), "success");
        setToken(result.data.accessToken);
        navigate(`/`);
      } else {
        addToast(te(result?.errorCode) || "Login failed", "error");
      }
    } catch (error) {
      addToast(te(error?.errorCode) || error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}

export default useLogin;
