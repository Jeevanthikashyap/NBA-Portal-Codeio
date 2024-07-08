import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Cookies from 'js-cookie';

export const useLogout = () => {
    const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const logout = () => {
    setIsLoading(true);
    setError(null);
    try{
        Cookies.remove('role')
    Cookies.remove('token')
    } catch(err){
        setError('Something wrong! try again later')
    }
    setIsLoading(false)
  }

  return {logout, isLoading, error}
}