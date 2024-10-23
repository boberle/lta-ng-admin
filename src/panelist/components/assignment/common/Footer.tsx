import View from "../../View.tsx";

export type FooterProps = {
  mainButtonLabel: string;
  mainButtonPress: () => void;
  secondaryButtonLabel: string;
  secondaryButtonPress: () => void;
  enableMainButton: boolean;
  style?: { [key: string]: string };
};

const Footer = ({
  mainButtonLabel,
  mainButtonPress,
  secondaryButtonLabel,
  secondaryButtonPress,
  enableMainButton,
  style,
}: FooterProps) => {
  let mainButtonStyle = {
    ...styles.buttons,
    ...styles.mainButton,
  };
  if (!enableMainButton) {
    mainButtonStyle = { ...mainButtonStyle, ...styles.mainButtonDisabled };
  }

  return (
    <>
      <View style={{ ...styles.container, ...style }}>
        <button
          style={{ ...styles.buttons, ...styles.secondaryButton }}
          onClick={secondaryButtonPress}
        >
          {secondaryButtonLabel}
        </button>
        <button
          style={mainButtonStyle}
          onClick={mainButtonPress}
          disabled={!enableMainButton}
        >
          {mainButtonLabel}
        </button>
      </View>
    </>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
  },
  mainButton: {
    backgroundColor: "steelblue",
  },
  mainButtonDisabled: {
    backgroundColor: "gray",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "steelblue",
  },
};

export default Footer;
