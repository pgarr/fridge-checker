import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";

interface NewItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (name: string, date: string) => void;
}

const NewItemModal = ({ isVisible, onClose, onSave }: NewItemModalProps) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const onSubmit = () => {
    onSave(name, date);
    setName("");
    setDate("");
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Add new item</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          <View style={styles.inputsContainer}>
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
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: "30%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#ccc",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  inputsContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default NewItemModal;
