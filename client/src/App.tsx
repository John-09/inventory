// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./Layouts/BaseLayout";
import Dashboard from "./Pages/dashboard";
import Catergory from "./Pages/Master/Category";
import Customer from "./Pages/Master/Customer";
import Product from "./Pages/Master/Product";
import Supplier from "./Pages/Master/Supplier";
import Warehouse from "./Pages/Master/Warehouse";
import Inventory from "./Pages/inventory";
import PurchaseOrder from "./Pages/purchaseOrders";
import SalesOrder from "./Pages/salesOrder";

import AuthLayout from "./Layouts/AuthLayout";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'




function App() {


  const routes = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          element: <Dashboard />,
          index: true
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "master",
          children: [
            {
              path: "product",
              children: [
                {
                  index: true,
                  element: <Product />
                }
              ]
            },
            {
              path: "category",
              children: [
                {
                  index: true,
                  element: <Catergory />
                }
              ]
            },
            {
              path: "supplier",
              children: [
                {
                  index: true,
                  element: <Supplier />
                }
              ]
            },
            {
              path: "customer",
              children: [
                {
                  index: true,
                  element: <Customer />
                }
              ]
            },
            {
              path: "warehouse",
              children: [
                {
                  index: true,
                  element: <Warehouse />
                }
              ]
            }
          ]
        },
        {
          path: "inventory",
          element: <Inventory />,
        },
        {
          path: "purchase-order",
          element: <PurchaseOrder />,
        },
        {
          path: "sales-order",
          element: <SalesOrder />,
        },
        {
          path: "*",
          element: <h1 className=" 
          flex
          justify-center
          items-center
          h-screen
          text-4xl
          font-bold
          ">
            There is No Such Page 🤷🏻
          </h1>
        }
      ]
    },
    // define the routes for the auth layout
  //   {
  //     path: "/auth",
  //     element: <AuthLayout />,
  //     children: [
  //       {
  //         path: "login",
  //         element: <Login />,
  //       },
  //       {
  //         path: "signup",
  //         element: <SignUpPage />,
  //       },
  //       {
  //         path: "forgot-password",
  //         element: <ForgetPassword />,
  //       },
  //       {
  //         path: "*",
  //         element: <h1 className=" flex
  //         justify-center
  //         items-center
  //         h-screen
  //         text-4xl
  //         font-bold">Not Found</h1>
  //       }
  //     ]
  //   }
  
  ]);

  const queryClient = new QueryClient()
  

  return (
    <QueryClientProvider client={queryClient}>
       <RouterProvider router={routes} />
       {/* <ReactQueryDevtools initialIsOpen={false} /> */}
     </QueryClientProvider>
  )
}

export default App
