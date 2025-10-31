import { API_URL } from "@config/apiConfig";
import useAppBase from "@hooks/useAppBase";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const { te, ts, loading, setLoading, addToast } = useAppBase();

  const navigate = useNavigate();

  const handleRegister = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    if (firstName === "") {
      addToast(te("AUTH_FIRSTNAME_REQUIRED"), "error");
      return;
    }

    if (lastName === "") {
      addToast(te("AUTH_LASTNAME_REQUIRED"), "error");
      return;
    }
    if (email === "") {
      addToast(te("AUTH_EMAIL_REQUIRED"), "error");
      return;
    }

    if (password === "") {
      addToast(te("AUTH_PASSWORD_REQUIRED"), "error");
      return;
    }

    if (confirmPassword === "") {
      addToast(te("AUTH_CONFIRM_PASSWORD_REQUIRED"), "error");
      return;
    }

    if (password !== confirmPassword) {
      addToast(te("AUTH_PASSWORD_MISMATCH"), "error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        addToast(ts("AUTH_REGISTER_SUCCESS"), "success");
        navigate(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        addToast(te(result?.errorCode) || "Registration failed", "error");
      }
    } catch (error) {
      addToast(te(error?.errorCode) || error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
}

export default useRegister;
