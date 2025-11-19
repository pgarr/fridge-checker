import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultDaysForWarning = 3;
const storageKeyDaysForWarning = "daysForWarning";
const defaultDaysForCritical = 1;
const storageKeyDaysForCritical = "daysForCritical";
const defaultHourForNotification = 9;
const storageKeyHourForNotification = "hourForNotification";

const getDaysForWarning = async () => {
  const value = await AsyncStorage.getItem(storageKeyDaysForWarning);
  return value ? parseInt(value, 10) : defaultDaysForWarning;
};

export const saveDaysForWarning = async (days: number) => {
  await AsyncStorage.setItem(storageKeyDaysForWarning, days.toString());
};

const getDaysForCritical = async () => {
  const value = await AsyncStorage.getItem(storageKeyDaysForCritical);
  return value ? parseInt(value, 10) : defaultDaysForCritical;
};

export const saveDaysForCritical = async (days: number) => {
  await AsyncStorage.setItem(storageKeyDaysForCritical, days.toString());
};

const getHourForNotification = async () => {
  const value = await AsyncStorage.getItem(storageKeyHourForNotification);
  return value ? parseInt(value, 10) : defaultHourForNotification;
};

export const saveHourForNotification = async (hour: number) => {
  await AsyncStorage.setItem(storageKeyHourForNotification, hour.toString());
};

export const useConfig = () => {
  const [daysForCritical, setDaysForCritical] = useState(
    defaultDaysForCritical
  );
  const [daysForWarning, setDaysForWarning] = useState(defaultDaysForWarning);
  const [hourForNotification, setHourForNotification] = useState(
    defaultHourForNotification
  );

  useEffect(() => {
    const fetchSettings = async () => {
      setDaysForCritical(await getDaysForCritical());
      setDaysForWarning(await getDaysForWarning());
      setHourForNotification(await getHourForNotification());
    };
    fetchSettings();
  }, []);

  return { daysForCritical, daysForWarning, hourForNotification };
};
