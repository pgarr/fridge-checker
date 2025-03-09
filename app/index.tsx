import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import FloatingAddButton from "@/components/floatingAddButton";
import FridgeItemView from "@/components/fridgeItem";
import { FridgeItem } from "@/utils/types";
import { getAllItems, deleteItem } from "@/utils/dataStorage";

const Index = () => {
  const db = useSQLiteContext();
  const [items, setItems] = useState<FridgeItem[]>([]);

  useEffect(() => {
    //FIXME: adding or deleting an item does not update the list
    async function setup() {
      const result = await getAllItems(db);
      setItems(result);
    }
    setup();
  }, [db]);

  return (
    <View style={styles.container}>
      <FloatingAddButton /> //FIXME: FloatingAddButton loses clickability when
      there are items in the list
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FridgeItemView
            item={item}
            onDelete={() => deleteItem(db, item.id)}
          />
        )}
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
