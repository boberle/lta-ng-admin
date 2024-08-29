import { User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { getFirebaseAuth } from "../actions/firebase";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return getFirebaseAuth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  return {
    user,
    isLoading,
  };
};

export default useAuth;
