import * as Notifications from "expo-notifications";

export const setupNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    }),
  });
};

export const scheduleNotification = async (
  date: Date,
  title: string
): Promise<string> => {
  return Notifications.scheduleNotificationAsync({
    content: {
      title,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
    },
  });
};

export const cancelNotification = async (id: string) => {
  await Notifications.cancelScheduledNotificationAsync(id);
};

export const rescheduleNotification = async (
  id: string,
  date: Date,
  title: string
): Promise<string> => {
  await cancelNotification(id);
  return scheduleNotification(date, title);
};
