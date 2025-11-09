import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import FloatingAddButton from "@/components/floatingAddButton";
import FridgeItemView from "@/components/fridgeItem";
import { FridgeItem } from "@/utils/types";
import { getAllItems, deleteItem, addItem } from "@/utils/dataStorage";
import NewItemModal from "@/components/newItemModal";
import { colors } from "@/utils/colors";
import {
  cancelNotification,
  scheduleNotification,
} from "@/utils/notifications";
import { getDaysForCritical, getHourForNotification } from "@/utils/config";

const Index = () => {
  const db = useSQLiteContext();
  const [items, setItems] = useState<FridgeItem[]>([]);
  const [showAddItem, setShowAddItem] = useState<boolean>(false);

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  const loadItems = async () => {
    const result = await getAllItems(db);
    setItems(result.sort((a, b) => a.date.getTime() - b.date.getTime()));
  };

  const addNewItem = async (name: string, date: Date) => {
    const title = `Item "${name}" is expiring tomorrow!`;

    const notificationDate = new Date(date);
    notificationDate.setDate(notificationDate.getDate() - getDaysForCritical());
    notificationDate.setHours(getHourForNotification(), 0, 0, 0);

    const notificationId = await scheduleNotification(notificationDate, title);
    await addItem(db, { name, date: date.toISOString(), notificationId });
    loadItems();
    setShowAddItem(false);
  };

  const deleteListedItem = async (id: number) => {
    const notificationId = items.find((item) => item.id === id)?.notificationId;
    notificationId && cancelNotification(notificationId);
    await deleteItem(db, id);
    loadItems();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FridgeItemView
            item={item}
            onDelete={() => deleteListedItem(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />
      {!showAddItem && (
        <FloatingAddButton
          onClick={() => {
            setShowAddItem(true);
          }}
        />
      )}
      <NewItemModal
        isVisible={showAddItem}
        onClose={() => setShowAddItem(false)}
        onSave={addNewItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    gap: 1,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
});

export default Index;
