import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/dataStorage";
import { setupNotificationHandler } from "@/utils/notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Feather from "@expo/vector-icons/Feather";

export default function RootLayout() {
  setupNotificationHandler();

  return (
    <SQLiteProvider databaseName="fridgeChecker.db" onInit={migrateDbIfNeeded}>
      <GestureHandlerRootView>
        <Tabs
          screenOptions={{
            headerShown: true,
            tabBarStyle: Platform.select({
              ios: {
                position: "absolute",
              },
              default: {},
            }),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Fridge",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="fridge" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => (
                <Feather name="settings" size={28} color={color} />
              ),
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
