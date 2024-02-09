/** @format */

import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Toast from "../component/Toast";
const ToastContext = createContext("");
export default function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: "", color: "", open: false });
  function handleToast(newMessage, newColor) {
    setToast({ open: true, message: newMessage, color: newColor });
    setTimeout(() => {
      setToast({ ...toast, open: false });
    }, 4000);
  }
  return (
    <ToastContext.Provider value={{ handleToast }}>
      <Toast message={toast.message} color={toast.color} open={toast.open} />
      {children}
    </ToastContext.Provider>
  );
}
export const useToast = () => {
  return useContext(ToastContext);
};
