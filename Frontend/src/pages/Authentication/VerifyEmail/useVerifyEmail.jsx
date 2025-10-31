import { API_URL } from "@config/apiConfig";
import useAppBase from "@hooks/useAppBase";
import { useEffect, useState } from "react";

function useVerifyEmail() {
  const { te, ts, loading, setLoading, addToast } = useAppBase();
  const [countDown, setCountDown] = useState(0);

  const handleSendCode = async (email) => {
    if (!email) {
      addToast("No email to verify", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/v1/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        addToast(ts("AUTH_SEND_CODE_SUCCESS"), "success");
        setCountDown(60);
      } else {
        addToast(te(result?.errorCode), "error");
      }
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCode = async (email, code) => {
    if (!code) {
      addToast(te("AUTH_CODE_REQUIRED"), "error");
      return;
    }
    if (!email) {
      addToast("No email to verify", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/v1/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();

      if (response.ok) {
        addToast(ts("AUTH_EMAIL_VERIFIED_SUCCESS"), "success");
      } else {
        addToast(te(result?.errorCode), "error");
      }
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Countdown
  useEffect(() => {
    if (countDown <= 0) return;

    const interval = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return { handleSubmitCode, handleSendCode, loading, countDown };
}

export default useVerifyEmail;
