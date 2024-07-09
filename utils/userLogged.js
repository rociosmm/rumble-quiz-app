import AsyncStorage from "@react-native-async-storage/async-storage";

export default getUserLogged = async (setUserLogged) => {
  try {
    const user = await AsyncStorage.getItem("userLogged");
    setUserLogged(user);
  } catch (error) {
    console.error("Error retrieving user from AsyncStorage", error);
  }
};
