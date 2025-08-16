import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="RoleSelectScreen">
      <Stack.Screen name="RoleSelectScreen" options={{ headerShown: false }} />
      <Stack.Screen name="student/index" options={{ title: "Student Dashboard" }} />
      <Stack.Screen name="guard/index" options={{ title: "Security Dashboard" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
