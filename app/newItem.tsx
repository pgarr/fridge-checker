import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { addItem } from "@/utils/dataStorage";

export default function NewItemScreen() {
  const db = useSQLiteContext();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const onSubmit = () => {
    addItem(db, name, date);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
