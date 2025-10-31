import AllAuthProvider from "./auth/AllAuthProvider";
import AllUIProvider from "./ui/AllUIProvider";
import AllUserProvider from "./user/AllUserProvider";

function GlobalProviders({ children }) {
  return (
    <AllUIProvider>
      <AllAuthProvider>
        <AllUserProvider>{children}</AllUserProvider>
      </AllAuthProvider>
    </AllUIProvider>
  );
}

export default GlobalProviders;
