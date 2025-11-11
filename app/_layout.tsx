import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { migrateDbIfNeeded } from "@/utils/dataStorage";
import { setupNotificationHandler } from "@/utils/notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  setupNotificationHandler();

  return (
    <SQLiteProvider databaseName="fridgeChecker.db" onInit={migrateDbIfNeeded}>
      <GestureHandlerRootView>
        <Tabs
          screenOptions={{
            headerShown: false,
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
              title: "Home",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="home" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              title: "About",
              tabBarIcon: ({ color }) => (
                <AntDesign name="infocirlceo" size={28} color={color} />
              ),
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
