import PageLayout from "../components/PageLayout/PageLayout.jsx";
import Brand from "../pages/brand/Brand.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Permission from "../pages/permission/Permission.jsx";
import Role from "../pages/role/Role.jsx";
import User from "../pages/user/User.jsx";
import PrivateGard from "./PrivateGard.jsx";

// create privateRouter
const privateRouter = [
  {
    element: <PageLayout />,

    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <User />,
          },
          {
            path: "/role",
            element: <Role />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
          {
            path: "/brand",
            element: <Brand />,
          },
        ],
      },
    ],
  },
];

// export router
export default privateRouter;
