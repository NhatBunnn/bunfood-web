import AllUIProvider from "./ui/AllUIProvider";

function GlobalProviders({ children }) {
  return <AllUIProvider>{children}</AllUIProvider>;
}

export default GlobalProviders;
