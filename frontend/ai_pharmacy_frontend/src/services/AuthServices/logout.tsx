import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export const useLogout = () => {
  const { setToken } = useStateContext();
  const navigate = useNavigate();

  const logout = () => {
    try {
      setTimeout(() => {
        console.log("Logging out...");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("USER_USERNAME");
        setToken(null);
       }, 2000);
      navigate("/login");
    } catch(err) {
      console.log("Error occured while attempting to logout. ", err);
    }
  };

  return logout;
};