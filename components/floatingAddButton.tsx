import { StyleSheet, TouchableOpacity, Text } from "react-native";
import * as texts from "@/utils/texts";
import { colors } from "@/utils/colors";

interface FloatingAddButtonProps {
  onClick: () => void;
}

const FloatingAddButton = ({ onClick }: FloatingAddButtonProps) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onClick}>
      <Text style={styles.text}>{texts.add}</Text>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: colors.button,
    color: colors.tile,
    width: "auto",
    height: "auto",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 40,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  text: { color: colors.tile },
  plus: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.tile,
  },
});

export default FloatingAddButton;
