import axiosClient from "../../axiosClient";
import type { User } from "../../models/User";
import { useStateContext } from "../../contexts/ContextProvider";



export const login = async (user: User) => {
  try {
    const response = await axiosClient.post("/user/login", {
      email: user.email,
      password: user.password,
      age: user.age
    });

    console.log("Login response:", response.data);
    const token = response.data.token;
    const userData = response.data.user;

    if (token && userData) {
      localStorage.setItem("USER_USERNAME", userData.username);
      localStorage.setItem("USER_EMAIL", userData.email);
      localStorage.setItem("USER_AGE", userData.age);
      localStorage.setItem("ACCESS_TOKEN", token);
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Login failed:", error.response.data);
    } else {
      console.error("Login error:", error.message);
    }
    throw error;
  }
};

export const logout = (navigate: Function) => {
  console.log("Logging out...");

  const { setToken } = useStateContext();
  
  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.removeItem('USER_USERNAME');
  localStorage.removeItem('USER_EMAIL');
  localStorage.removeItem('USER_AGE')
  
  setToken(null); 
  navigate("/login");
};