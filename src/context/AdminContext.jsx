
import { useContext, createContext, useState, useEffect } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    
    // Load the initial state from sessionStorage if available
    const storedAdmin = sessionStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : {
      id: "",
      name: "",
      email: "",
      role: "",
      isActive: "",
      profilePic: "",
    };
  });

  useEffect(() => {
    // Update sessionStorage whenever the admin state changes
    if (admin.id) {
      sessionStorage.setItem("admin", JSON.stringify(admin));
    } else {
      sessionStorage.removeItem("admin"); // Remove it if admin logs out
    }
  }, [admin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdmin = () => useContext(AdminContext);

export { AdminProvider, useAdmin };
