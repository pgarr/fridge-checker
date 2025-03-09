import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/dataStorage";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="fridgeChecker.db" onInit={migrateDbIfNeeded}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "List" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
      </Stack>
    </SQLiteProvider>
  );
}
