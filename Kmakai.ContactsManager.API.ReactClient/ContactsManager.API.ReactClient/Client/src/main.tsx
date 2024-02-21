import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux/es/exports";
import store from "./features/store";
import App from "./App.tsx";
import "./index.css";
// import ContactCard from "./components/ContactCard.tsx";
import ContactsList from "./components/ContactsList.tsx";
import ContactEditForm from "./components/ContactEditForm.tsx";
import ContactForm from "./components/ContactForm.tsx";
import Contact from "./components/Contact.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <div>Something went wrong</div>,
        children: [
          {
            index: true,
            element: <ContactsList />,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
          },
          {
            path: "contacts/:contactId/edit",
            element: <ContactEditForm />,
          },
          {
            path: "contacts/new",
            element: <ContactForm />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
