import Footer from "./common/Footer";
import View from "../View.tsx";
import Text from "../Text.tsx";

export type WelcomeProps = {
  message: string;
  onClose: () => void;
  onStart: () => void;
};

const Welcome = ({ message, onClose, onStart }: WelcomeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.heading}>
          Bienvenue à cette enquête sur Lang Track App!
        </Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.footer}>
        <Footer
          mainButtonLabel={"Commencer"}
          mainButtonPress={onStart}
          secondaryButtonLabel={"Fermer"}
          secondaryButtonPress={onClose}
          enableMainButton={true}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: "100%",
  },
  body: {
    marginBottom: "auto",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    marginBottom: 50,
    marginTop: 20,
  },
  message: {
    padding: 25,
  },
  footer: {
    margin: 10,
  },
};

export default Welcome;
