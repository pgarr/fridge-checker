import { colors } from "@/utils/colors";
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
              <MaterialIcons name="close" size={22} />
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
    backgroundColor: colors.tile,
    position: "absolute",
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: colors.tile,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
  },
  inputsContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: colors.background,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default NewItemModal;
