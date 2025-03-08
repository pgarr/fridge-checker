import FloatingAddButton from "@/components/floatingAddButton";
import FridgeItemView from "@/components/fridgeItem";
import { FridgeItem } from "@/types";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const expampleData: FridgeItem[] = [
  { id: "1", name: "Jogurt", date: "2025-03-20" },
  { id: "2", name: "Mleko", date: "2025-03-20" },
  { id: "3", name: "Ser", date: "2025-03-20" },
  { id: "4", name: "Szynka", date: "2025-03-20" },
  { id: "5", name: "Masło", date: "2025-03-20" },
  { id: "6", name: "Jajka", date: "2025-03-20" },
];

const Index = () => {
  return (
    <View style={styles.container}>
      <FloatingAddButton />
      <FlatList
        data={expampleData}
        keyExtractor={(item) => item.id}
        renderItem={FridgeItemView}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
