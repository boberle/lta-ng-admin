import { useEffect, useState } from "react";
import { login } from "../actions/firebase.ts";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "./common/LoadingComponent.tsx";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      await login(username, password);
      navigate("/console/");
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const credentialsInput = (
    <>
      <div>
        <div className={styles.message}>
          Please enter your credentials to log in:
        </div>
        <input
          type="text"
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className={styles.button} onClick={handleLogin}>
        Login
      </button>
    </>
  );

  useEffect(() => {
    setShowErrorPopup(isError);
  }, [isError]);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>Welcome to the</div>
        <div className={styles.title}>Lang Track App NG</div>
      </div>

      {isLoading ? (
        <LoadingComponent />
      ) : showErrorPopup ? (
        <ErrorPopup onHide={() => setShowErrorPopup(false)} />
      ) : (
        credentialsInput
      )}
    </div>
  );
};

const ErrorPopup = ({ onHide }: { onHide: () => void }) => {
  return (
    <div>
      <div className={styles.errorMessage}>
        Login failed. Please check your credentials and try again.
      </div>
      <button className={styles.button} onClick={onHide}>
        Retry
      </button>
    </div>
  );
};

export default LoginPage;
