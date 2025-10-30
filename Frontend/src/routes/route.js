import { Homepage, Login, NotFound, Register, VerifyEmail } from "@pages/index";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Forbidden from "@pages/FallBack/Forbidden/Forbidden";

const publicRoutes = [
  // Homepage
  { path: "/", Page: Homepage, Layout: DefaultLayout },

  // Authentication
  { path: "/login", Page: Login, Layout: DefaultLayout },
  { path: "/register", Page: Register, Layout: DefaultLayout },
  { path: "/verify-email", Page: VerifyEmail, Layout: DefaultLayout },

  // FallBack
  { path: "/*", Page: NotFound },
  { path: "/403*", Page: Forbidden },
];

export { publicRoutes };
