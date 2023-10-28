import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password, userType) => {
    setIsLoading(true);
    setError(null);

    // const allowedUserTypes = ["customer", "admin", "seller"];

    // if (!allowedUserTypes.includes(userType)) {
    //   setIsLoading(false);
    //   setError("Invalid user type");
    //   return;
    // }

    try {
      const response = await fetch("/api/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setIsLoading(false);
        setError(errorData.error);
        return;
      }

      const json = await response.json();
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      // Access the userTypze property from the JSON response

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred during login.");
    }
  };

  return { login, isLoading, error };
};
