import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/utils/colors";

interface FloatingMenuProps {
  onDelete: () => void;
  //   onEdit: () => void;
  onCancel: () => void;
  selectedCount: number;
}

const FloatingMenu = ({
  onDelete,
  onCancel,
  selectedCount,
}: FloatingMenuProps) => {
  return (
    <View style={styles.floatingMenu}>
      <TouchableOpacity onPress={onCancel}>
        <Entypo name="cross" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <EvilIcons name="trash" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>{selectedCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingMenu: {
    backgroundColor: colors.button,
    color: colors.tile,
    width: "auto",
    height: "auto",
    borderRadius: 30,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: 40,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  text: {
    color: colors.tile,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FloatingMenu;
