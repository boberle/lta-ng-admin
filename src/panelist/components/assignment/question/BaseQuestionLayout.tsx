import Footer from "../common/Footer";
import View from "../../View.tsx";
import Text from "../../Text.tsx";

type IconType = "done" | "single" | "multiple" | "open-ended";

export type BaseQuestionProps = {
  children: any;
  iconType: IconType;
  onNext: () => void;
  onPrevious: () => void;
  nextButtonLabel?: string;
  enableNextButton: boolean;
};

export type QuestionProps = {
  message: string;
  onNext: () => void;
  onPrevious: () => void;
  enableNextButton: boolean;
};

const BaseQuestionLayout = ({
  children,
  //iconType,
  onNext,
  onPrevious,
  nextButtonLabel = "Suivant",
  enableNextButton,
}: BaseQuestionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text>Imagine here some funny icon</Text>
      </View>
      <View style={styles.message}>{children}</View>
      <View style={styles.footer}>
        <Footer
          mainButtonLabel={nextButtonLabel}
          mainButtonPress={onNext}
          secondaryButtonLabel={"Précédent"}
          secondaryButtonPress={onPrevious}
          enableMainButton={enableNextButton}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: "100%",
  },
  icon: {
    marginBottom: 10,
    marginTop: 40,
    flex: 1,
    alignItems: "center",
  },
  message: {
    padding: 25,
  },
  footer: {
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
};

export default BaseQuestionLayout;
