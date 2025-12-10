import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [tokens, setTokens] = useState(() =>
    localStorage.getItem("access")
      ? {
          access: localStorage.getItem("access"),
          refresh: localStorage.getItem("refresh"),
        }
      : null
  );
    const storedUser = (() => {
    try {
      const item = localStorage.getItem("user")
      return item ? JSON.parse(item) : null;
    }catch (error) {
      return null;
    }
  })();

  const [user, setUser] = useState(storedUser)

  // LOGIN
  const login = async (username, password) => {
    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setTokens(data);
      setUser({ username });

      localStorage.setItem("user", JSON.stringify({ username }));

      navigate("/");
    } else {
      alert("Invalid login");
    }
  };

  // REGISTER
  const register = async (username, password, email) => {
    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (res.ok) {
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  // LOGOUT
  const logout = () => {
    setTokens(null);
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  // AUTO TOKEN REFRESH
  const refreshToken = async () => {
    if (!tokens?.refresh) return;

    const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: tokens.refresh }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("access", data.access);
      setTokens((prev) => ({ ...prev, access: data.access }));
    } else {
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 1000 * 60 * 4); // every 4 mins

    return () => clearInterval(interval);
  }, [tokens]);

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
