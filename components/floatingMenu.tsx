import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/utils/colors";
import * as texts from "@/utils/texts";

interface FloatingMenuProps {
  onDelete: () => void;
  //   onEdit: () => void;
  onCancel: () => void;
  onCopy: () => void;
  selectedCount: number;
}

const FloatingMenu = ({
  onDelete,
  onCancel,
  selectedCount,
  onCopy,
}: FloatingMenuProps) => {
  return (
    <View style={styles.floatingMenu}>
      <TouchableOpacity onPress={onCancel}>
        <Entypo name="cross" size={30} color="white" />
      </TouchableOpacity>
      <Text style={[styles.text, styles.button]}>{selectedCount}</Text>
      <TouchableOpacity onPress={onCopy} style={styles.button}>
        <Text style={styles.text}>{texts.copy}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.button}>
        <Text style={styles.text}>{texts.deleteText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingMenu: {
    backgroundColor: colors.button,
    borderRadius: 30,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20, // <-- 20px from left
    right: 20, // <-- 20px from right -> width = containerWidth - 40
    bottom: 20,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    gap: 20,
  },
  text: {
    color: colors.tile,
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    flex: 1,
    textAlign: "center",
  },
});

export default FloatingMenu;
