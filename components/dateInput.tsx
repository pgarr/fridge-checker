import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, View, Text, StyleProp, ViewStyle } from "react-native";

type DateInputProps = {
  date: Date | undefined;
  setDate: (date: Date) => void;
  style: StyleProp<ViewStyle>;
};

const DateInput = ({ date, setDate, style }: DateInputProps) => {
  const [show, setShow] = useState(false);

  const onChange = (_event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date || new Date();
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View style={style}>
      <Pressable onPress={() => setShow(true)}>
        <Text>{date?.toLocaleDateString()}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateInput;
