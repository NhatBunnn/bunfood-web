import { createContext, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo đã import CSS Bootstrap

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // Tự động xóa sau duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Map type sang class Bootstrap
  const getToastVariant = (type) => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "danger";
      case "warning":
        return "warning";
      case "info":
      default:
        return "info";
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container - Bootstrap style */}
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999, pointerEvents: "none" }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast align-items-center text-white bg-${getToastVariant(
              toast.type
            )} border-0 show`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{
              minWidth: "250px",
              pointerEvents: "auto",
              animation: "slideInRight 0.3s ease-out",
            }}
          >
            <div className="d-flex">
              <div className="toast-body fw-medium">{toast.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => removeToast(toast.id)}
              ></button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`}</style>
    </ToastContext.Provider>
  );
};
