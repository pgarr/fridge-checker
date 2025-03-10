import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FridgeItem as FridgeItemType } from "@/utils/types";
import { colors } from "@/utils/colors";

interface FridgeItemProps {
  item: FridgeItemType;
  onDelete: () => void;
}

const FridgeItem = ({ item, onDelete }: FridgeItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash-bin" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tile,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: { fontWeight: "bold" },
  date: { fontFamily: "italic" },
});

export default FridgeItem;
