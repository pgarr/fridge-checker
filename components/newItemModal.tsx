import { colors } from "@/utils/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

interface NewItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (name: string, date: string) => void;
}

type FormData = {
  date: string;
  name: string;
};

const NewItemModal = ({ isVisible, onClose, onSave }: NewItemModalProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onSave(data.name, data.date);
    setValue("name", "");
    setValue("date", "");
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
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
            />
            <Text style={styles.errorText}>
              {errors.name ? "Name is required." : " "}
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Date"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="date"
            />
            <Text style={styles.errorText}>
              {errors.date ? "Date is required." : " "}
            </Text>
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: "60%",
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default NewItemModal;
