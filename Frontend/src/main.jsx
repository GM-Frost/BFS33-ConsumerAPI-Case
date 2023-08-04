import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import CatlogAPI from "./components/APIpages/CatlogAPI";
import ConsumerAPI from "./components/APIpages/ConsumerAPI";
import ServiceAPI from "./components/APIpages/ServiceAPI";
import EnterpriseAPI from "./components/APIpages/EnterpriseAPI";

import ConsumerOrder from "./components/APIpages/APIsubPages/ConsumerOrder";
import EnterpriseConsumersTable from "./components/APIpages/APIsubPages/EnterpriseConsumersTable";
import EnterpriseCustomerOrder from "./components/APIpages/APIsubPages/EnterpriseCustomerOrder";
import EnterpriseCustomer from "./components/APIpages/APIsubPages/EnterpriseCustomer";
import EnterpriseAllOrder from "./components/APIpages/APIsubPages/EnterpriseAllOrder";
import ConsumerAllOrders from "./components/APIpages/APIsubPages/ConsumerAllOrders";

import ConsumerInfoForm from "./components/APIpages/APIsubPages/ConsumerInfoForm";
import ConsumerCustomerTable from "./components/APIpages/APIsubPages/ConsumerCustomerTable";
import ConsumerCustomerOrderEdit from "./components/APIpages/APIsubPages/ConsumerCustomerOrderEdit";
import EnterpriseCustomerOrderEdit from "./components/APIpages/APIsubPages/EnterpriseCustomerOrderEdit";
import CatalogTable from "./components/APIpages/APIsubPages/CatalogTable";
import CatalogEdit from "./components/APIpages/APIsubPages/CatalogEdit";

const router = createBrowserRouter([
  {
    path: "/home/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/api/catalog",
    element: <CatlogAPI />,
  },
  {
    path: "/api/consumer",
    element: <ConsumerAPI />,
  },
  {
    path: "/api/service",
    element: <ServiceAPI />,
  },
  {
    path: "/api/enterprise",
    element: <EnterpriseAPI />,
  },
  {
    path: "/api/consumer/customers",
    element: <ConsumerCustomerTable />,
  },
  {
    path: "/api/enterprise/customers",
    element: <EnterpriseConsumersTable />,
  },
  {
    path: "/api/catalog/catalog",
    element: <CatalogTable />,
  },
  {
    path: "/api/consumer/orders",
    element: <ConsumerAllOrders />,
  },
  {
    path: "/api/enterprise/orders",
    element: <EnterpriseAllOrder />,
  },
  {
    path: "/api/consumer/customers/:customerID", // Parameterized URL
    element: <ConsumerInfoForm />,
  },
  {
    path: "/api/consumer/customers/:customerID/orders", // Parameterized URL
    element: <ConsumerOrder />,
  },
  {
    path: "/api/enterprise/customers/:customerID/orders", // Parameterized URL
    element: <EnterpriseCustomerOrder />,
  },
  {
    path: "/api/consumer/customers/:customerID/orders", // Parameterized URL
    element: <ConsumerOrder />,
  },
  {
    path: "/api/catalog/catalog/:catalogID", // Parameterized URL
    element: <CatalogEdit />,
  },
  {
    path: "/api/consumer/orders/:orderID", // Parameterized URL
    element: <ConsumerCustomerOrderEdit />,
  },
  {
    path: "/api/enterprise/orders/:orderID", // Parameterized URL
    element: <EnterpriseCustomerOrderEdit />,
  },

  {
    path: "/api/enterprise/customers/:customerID", // Parameterized URL
    element: <EnterpriseCustomer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
