import { useParams } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function Authentication() {
  const { page } = useParams();

  const pageList = {
    login: <Login />,
    register: <Register />,
  };

  return <div>{pageList[page] || <div>Page not found</div>}</div>;
}

export default Authentication;
