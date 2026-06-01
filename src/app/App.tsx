import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "../shared/providers/ToastProvider";
import { router } from "./router";

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastProvider />
    </>
  );
}