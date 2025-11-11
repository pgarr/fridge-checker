import { View, Text, StyleSheet } from "react-native";
import { FridgeItem as FridgeItemType } from "@/utils/types";
import { colors } from "@/utils/colors";
import { getDaysLeft } from "@/utils/functions";
import { getDaysForCritical, getDaysForWarning } from "@/utils/config";
import * as texts from "@/utils/texts";

interface FridgeItemProps {
  item: FridgeItemType;
  selected?: boolean;
}

const FridgeItem = ({ item, selected }: FridgeItemProps) => {
  const daysLeft = getDaysLeft(item.date, new Date());

  return (
    <View
      style={[
        styles.container,
        daysLeft <= getDaysForCritical()
          ? styles.critical
          : daysLeft <= getDaysForWarning()
          ? styles.warning
          : null,
        selected ? styles.selected : null,
      ]}
    >
      <Text style={styles.name}>{item.name}</Text>
      <View>
        <Text style={styles.days}>{`${daysLeft} ${texts.days}`}</Text>
        <Text style={styles.date}>{item.date?.toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tile,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  warning: { backgroundColor: colors.warning },
  critical: { backgroundColor: colors.critical },
  name: { fontWeight: "bold" },
  date: { fontFamily: "italic", fontSize: 10 },
  days: { fontWeight: "bold", fontSize: 16 },
  selected: { backgroundColor: colors.selected },
});

export default FridgeItem;
