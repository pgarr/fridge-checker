import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "List", headerShown: false }}
      />
      <Stack.Screen
        name="newItem"
        options={{ title: "New item", headerShown: false }}
      />
      <Stack.Screen name="about" options={{ title: "About" }} />
    </Stack>
  );
}
