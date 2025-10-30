import { ToastProvider } from "./ToastContext";

function AllUIProvider({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}

export default AllUIProvider;
