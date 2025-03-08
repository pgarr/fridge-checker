import { FridgeItem as FridgeItemType } from "@/types";
import { View, Text, StyleSheet } from "react-native";

const FridgeItem = ({ item }: { item: FridgeItemType }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>{item.date}</Text>
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
