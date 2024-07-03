/* import React, { createContext, useContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";

export const UserContext = createContext();

//custom hook - move it to a folder
/* export const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within an UserProvider");
  }

  return context;
}; */

/*export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState("non");

  const retrieving = async () => {
    try {
      const userLoggedStorage = await AsyncStorage.getItem("userLogged");
      if (userLoggedStorage !== null) {
        // We have data!!
        console.log(userLoggedStorage);
        return userLoggedStorage;
        //setUserLogged(userLoggedStorage);
      }
    } catch (error) {
      // Error retrieving data
      console.log("error retrieving data :>> ", error);
    }
  };

  /* move to login  
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("userLogged", userLogged);
    } catch (error) {
      // Error saving data
      console.log("error saving data :>> ", error);
    }
  }; */
/*const savedStored = retrieving();

  if (userLogged === "" && savedStored) {
    setUserLogged(savedStored);
  }

  useEffect(() => {
    console.log("retrieving", retrieving());
  }, [userLogged]);

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserContext.Provider>
  );
};
 */
