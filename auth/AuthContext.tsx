//React Context that exposes Firebase user session

import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";

// Context shape
interface AuthContextType {
  user: User | null;
  saveUser: (user: User | null) => void;
  token: string | null;
  saveToken: (token: string | null) => void;
}

//create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  saveUser: () => {},
  token: null,
  saveToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const saveUser = (user: User | null) => setUser(user);
  const saveToken = (token: string | null) => setToken(token);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, saveUser, token, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
