import TokenProvider from "./TokenContext";

function AllAuthProvider({ children }) {
  return <TokenProvider>{children}</TokenProvider>;
}

export default AllAuthProvider;
