import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          border: "1px solid #d6e2e0",
          borderRadius: "18px",
          background: "rgba(255, 255, 255, 0.96)",
          color: "#4b4b4b",
          boxShadow: "0 18px 45px rgba(175, 196, 192, 0.22)",
          fontFamily: '"Quicksand", "Raleway", system-ui, sans-serif',
        },
        success: {
          iconTheme: {
            primary: "#afc4c0",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#e98ba3",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}