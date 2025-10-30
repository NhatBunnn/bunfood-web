import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@context/ui/ToastContext";

function useAppBase() {
  const { t: te } = useTranslation("error");
  const { t: ts } = useTranslation("success");

  const { addToast } = useToast();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return {
    te,
    ts,
    success,
    setSuccess,
    error,
    setError,
    fieldErrors,
    setFieldErrors,
    loading,
    setLoading,
    addToast,
  };
}

export default useAppBase;
