import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Cookies from 'js-cookie';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://127.0.0.1:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json()
    if(!response.ok){
        setIsLoading(false)
        setError(json.message)
        console.log(json.message)
    } 
    if(response.ok) {
        Cookies.set("token", json['token'], {expires: new Date(Date.now() + 24*60*60*1000)})
        Cookies.set("role", json['role'], {expires: new Date(Date.now() + 24*60*60*1000)})
        dispatch({type: 'LOGIN', payload: json})
        setIsLoading(false)
    }
  }
  return { login, isLoading, error }
};
