// import Dashboard from "pages/dashboard";
import Cases from "pages/cases";
import Clients from "pages/clients";
import Dashboard from "pages/dashboard";
import Lawyers from "pages/lawyers";

const mainRoutes = {
  Dashboard: {
    path: "/dashboard",
    routeName: "/dashboard",
    component: Dashboard,
  },
  Laywers: {
    path: "/lawyers",
    routeName: "/lawyers",
    component: Lawyers,
  },
  Clients: {
    path: "/clients",
    routeName: "/clients",
    component: Clients,
  },
  Cases: {
    path: "/cases",
    routeName: "/cases",
    component: Cases,
  },
};

export default mainRoutes;
