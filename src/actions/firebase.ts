import { FirebaseApp, initializeApp } from "firebase/app";
import appConfig from "../constants/constants";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from "@firebase/auth";

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

const getFirebaseApp = () => {
  if (!_app) {
    _app = initializeApp({
      apiKey: appConfig.firebaseAPIKey,
      projectId: appConfig.projectId,
    });
  }
  return _app;
};

export const getFirebaseAuth = () => {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
    if (appConfig.authEmulatorURL != null) {
      connectAuthEmulator(_auth, appConfig.authEmulatorURL);
    }
  }
  return _auth;
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
