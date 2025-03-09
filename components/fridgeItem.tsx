import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FridgeItem as FridgeItemType } from "@/utils/types";

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
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    width: "90%",
  },
  name: { fontWeight: "bold" },
  date: { fontFamily: "italic" },
});

export default FridgeItem;
