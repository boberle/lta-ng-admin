import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../constants/constants";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";

const getFirebaseApp = () => {
  return initializeApp(firebaseConfig);
};

export const getFirebaseAuth = () => {
  return getAuth(getFirebaseApp());
};

export const login = async (username: string, password: string) => {
  const auth = getFirebaseAuth();

  try {
    await signInWithEmailAndPassword(auth, username, password);
  } catch (error) {
    console.error(error);
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  const auth = getFirebaseAuth();
  await auth.signOut();
  console.log("User signed out", auth.currentUser);
};

export default getFirebaseApp;
