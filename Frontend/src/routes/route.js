import { Authentication, Homepage } from "@pages/index";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

const publicRoutes = [
  { path: "/", Page: Homepage, Layout: DefaultLayout },
  { path: "/:page", Page: Authentication },
];

export { publicRoutes };
