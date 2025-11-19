import {
  saveDaysForCritical,
  saveDaysForWarning,
  saveHourForNotification,
  useConfig,
} from "@/utils/config";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";

type FormData = {
  daysForWarning: string;
  daysForCritical: string;
  hourForNotification: string;
};

export default function SettingsScreen() {
  const { control, handleSubmit, setValue } = useForm<FormData>();

  const { daysForCritical, daysForWarning, hourForNotification } = useConfig();

  const onSubmit = (data: FormData) => {
    saveDaysForWarning(parseInt(data.daysForWarning, 10));
    saveDaysForCritical(parseInt(data.daysForCritical, 10));
    saveHourForNotification(parseInt(data.hourForNotification, 10));
  };

  const onBlur = handleSubmit(onSubmit);

  useEffect(() => {
    setValue("daysForWarning", daysForWarning.toString());
    setValue("daysForCritical", daysForCritical.toString());
    setValue("hourForNotification", hourForNotification.toString());
  }, [daysForCritical, daysForWarning, hourForNotification, setValue]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="daysForWarning"
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="daysForCritical"
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="hourForNotification"
      />
    </View>
  );
}
