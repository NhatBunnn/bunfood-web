import UserProvider from "./UserContext";

function AllUserProvider({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

export default AllUserProvider;
