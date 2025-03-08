import { Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

const FloatingAddButton = () => {
  return (
    <Link href="/newItem" asChild>
      <TouchableOpacity style={styles.floatingButton}>
        <Octicons name="diff-added" size={24} color="white" />
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "#ccc",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 30,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default FloatingAddButton;
