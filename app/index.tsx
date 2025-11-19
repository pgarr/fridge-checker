import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { runOnJS } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSQLiteContext } from "expo-sqlite";
import FloatingAddButton from "@/components/floatingAddButton";
import FridgeItemView from "@/components/fridgeItem";
import { FridgeItem } from "@/utils/types";
import { getAllItems, deleteItems, addItem } from "@/utils/dataStorage";
import NewItemModal from "@/components/newItemModal";
import { colors } from "@/utils/colors";
import {
  cancelNotification,
  scheduleNotification,
} from "@/utils/notifications";
import { useConfig } from "@/utils/config";
import FloatingMenu from "@/components/floatingMenu";

const Index = () => {
  const db = useSQLiteContext();
  const [items, setItems] = useState<FridgeItem[]>([]);
  const [showAddItem, setShowAddItem] = useState<boolean>(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
    new Set()
  );
  const { daysForCritical, hourForNotification } = useConfig();

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
    notificationDate.setDate(notificationDate.getDate() - daysForCritical);
    notificationDate.setHours(hourForNotification, 0, 0, 0);

    const notificationId = await scheduleNotification(notificationDate, title);
    await addItem(db, { name, date: date.toISOString(), notificationId });
    loadItems();
    setShowAddItem(false);
  };

  const deleteSelectedItems = async () => {
    selectedItemIds.forEach((id) => {
      const notificationId = items.find(
        (item) => item.id === id
      )?.notificationId;
      notificationId && cancelNotification(notificationId);
    });
    await deleteItems(db, Array.from(selectedItemIds));
    setSelectedItemIds(new Set());
    loadItems();
  };

  const onLongPressItem = (id: number) => {
    setSelectedItemIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
            if (success) {
              runOnJS(onLongPressItem)(item.id);
            }
          });

          return (
            <GestureDetector gesture={longPressGesture}>
              <FridgeItemView
                item={item}
                selected={selectedItemIds.has(item.id)}
              />
            </GestureDetector>
          );
        }}
        contentContainerStyle={styles.list}
      />
      {!showAddItem && selectedItemIds.size > 0 ? (
        <FloatingMenu
          onDelete={deleteSelectedItems}
          onCancel={() => setSelectedItemIds(new Set())}
          selectedCount={selectedItemIds.size}
          onCopy={() => {
            //TODO: implement copy
          }}
        />
      ) : (
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
    gap: 3,
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
