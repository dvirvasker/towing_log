/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-unresolved */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts

// import SystemAlerts from "layouts/SystemAlerts";
// import Dashboard from "layouts/dashboard/Tene/dashMain";
import TowingOrders from "layouts/tables/towingOrdersTable";
// import KshirotMisgrot from "layouts/dashboard/halfim";
import TowingDashboard from "layouts/dashboard/towinglog";
// import Pagedamagedtools from "layouts/dashboard/damagedtools";
// import Halfim from "layouts/dashboard/halfim";
// import HomePage from "layouts/home";
// import RequiredProjects from "layouts/requiedProjects";
import AdminManagementTable from "layouts/tables/userManagementTable";
// @mui icons
import Icon from "@mui/material/Icon";
//my components
// import AdminHome from "layouts/Forms/AdminHome";
// import MashkTech from "layouts/dashboard/mashkTeh";
// import NesoaShchikaDashbord from "layouts/dashboard/nesoaShchika";
// import Overview from "layouts/profile";
// import AboutPage from "views/aboutpage/AboutPage";
// import Error404 from "views/Error404";

const AdminRoutes = [
  {
    type: "collapse",
    name: "דף ראשי",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <TowingDashboard />,
  },
  {
    type: "collapse",
    name: `דו"ח יומי`,
    key: "landing",
    icon: <Icon fontSize="small">toys</Icon>,
    route: "/landing",
    component: <TowingOrders typeTable="landing" />,
  },

  {
    type: "collapse",
    name: "הזמנות שירות",
    key: "towingorders",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/towingorders",
    component: <TowingOrders typeTable="towingorders" />,
  },
  {
    type: "divider",
  },
  {
    type: "collapse",
    name: "ניהול משתמשים",
    key: "AdminManagementTable",
    icon: <Icon fontSize="small"> manage_accounts</Icon>,
    route: "/AdminManagementTable",
    component: <AdminManagementTable />,
  },
];

export default AdminRoutes;
