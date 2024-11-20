import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load initial state from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          id: "",
          email: "",
          password: "",
          profilePic: "",
          name: "",
          role: "user",
        };
  });

  useEffect(() => {
    // Persist user data to sessionStorage on change
    if (user.email) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user"); // Remove on logout
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
