import React, { createContext, useContext, useEffect, useState } from "react";


export const UserContext = createContext();

//custom hook - move it to a folder
/* export const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within an UserProvider");
  }

  return context;
}; */

export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState("");
  //const tokenStored = await SecureStore.getItemAsync(SecureStoreEnum.TOKEN);


  useEffect(() => {
    const initializeUser = async () => {
      const tokenStored = await SecureStore.getItemAsync(SecureStoreEnum.TOKEN);
      if (!userLogged.username && tokenStored) {
        const username = await SecureStore.getItemAsync(
          SecureStoreEnum.username
        );
        setUserLogged({ username });
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserContext.Provider>
  );
};
