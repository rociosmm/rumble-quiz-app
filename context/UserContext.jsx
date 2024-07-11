import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { patchUserByUsername, postUserLogin } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userLogged");
        console.log("userData context :>> ", typeof userData);
        if (userData) {
          setUserLogged(userData);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser();
  }, []);

  const login = async (userData, navigation) => {
    try {
      const res = await postUserLogin(userData);
      // console.log(Object.keys(res));
      if (res.status === 200) {
        await AsyncStorage.setItem("token", JSON.stringify(res.data));
        await AsyncStorage.setItem("userLogged", userData.username);
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        //setIsLoggedIn(true);
        setUserLogged(userData.username);
        navigation.navigate("AppNavigation");
      } else {
        alert(
          "Login failed",
          "Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.log("error in post request for login ", error);
      alert("Login failed", "An error occurred. Please try again later.");
    }
  };

const editUser = async (userToEdit, patchBody) => {
  try {
      const res = await patchUserByUsername(userLogged, patchBody);
      if (res.status === 200) {
        console.log('res :>> ', res);
        //await AsyncStorage.setItem("userLogged", newUsername);
        console.log("Updated userLogged, userLogged");
      }
    } catch (error) {
      console.log("error in patch request for login ", error);
    }
  };

  const logout = async (navigation) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", JSON.stringify(false));
      await AsyncStorage.setItem("token", "");
      await AsyncStorage.setItem("userLogged", "");
      navigation.navigate("LogIn");
      //setIsLoggedIn(false);
      setUserLogged(null);
    } catch (error) {
      console.error("Failed to remove user:", error);
    }
  };

  

  return (
    <UserContext.Provider
      value={{ userLogged, setUserLogged, login, logout, editUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
